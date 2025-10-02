import { PrismaClient } from "@prisma/client";
import { AuthResponse, User } from "../entities/auth.entity";
import { IAuthRepository } from "../useCase/interface/IAuthRepository";
import { AppError } from "../../../errors/httpErrors";
import { HTTP_STATUS } from "../../../configs/httpStatusCodes";
import bcrypt from "bcrypt";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";
import { generateAccessToken, generateNewAccessToken, generateRefreshToken, saveRefreshToken } from "../utils/jwt";
import { RedisClientType } from "redis";
import jwt from "jsonwebtoken"

@injectable()
export class AuthRepository implements IAuthRepository {

    constructor (
       @inject(INTERFACE_TYPE.PrismaService) private prisma: PrismaClient
    ) {
        this.prisma = prisma;
    }

    async login(data: User, redis: RedisClientType): Promise<AuthResponse> {
        const user = await this.prisma.user.findFirst({
            where: {email: data.email}
        })

        if(!user) {
           throw new AppError(HTTP_STATUS.NOT_FOUND, "user not found")
        }

        const isPasswordValid = bcrypt.compareSync(data.password, user.password)

        if(!isPasswordValid) {
            throw new AppError(HTTP_STATUS.BAD_REQUEST, "Invalid email or password")
        }

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)

        await saveRefreshToken(redis, user.id, refreshToken)

        return {user, accessToken, refreshToken}
    }
    async register(data: User): Promise<User> {
        
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (existingUser) {
            throw new AppError(HTTP_STATUS.CONFLICT, "User already exists with this email");
        }

        const hashedPassword = bcrypt.hashSync(data.password, 12);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: hashedPassword,
            }
        })

        const { password, ...safeUser } = user;

        return safeUser as User;

    }
    async logout(refreshToken: string, accessToken: string, redis: RedisClientType): Promise<void> {
       const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!,
            { ignoreExpiration: true }
        ) as { userId: number };

       await redis.del(`refresh:${decoded.userId}`);

       const accessDecoded = jwt.decode(accessToken) as { exp: number } | null;
      if (accessDecoded?.exp) {
        const ttl = accessDecoded.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) {
          await redis.setEx(`blacklist:${accessToken}`, ttl, "revoked");
        }
      }
       
    }
    async refreshToken(refreshToken: string, redis: RedisClientType): Promise<string> {
        const newAccessToken = await generateNewAccessToken(redis, refreshToken)
        return newAccessToken
    }
    findUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}