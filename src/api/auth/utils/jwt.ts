import jwt, { JwtPayload } from "jsonwebtoken"
import { RedisClientType } from "redis";
import { AppError } from "../../../errors/httpErrors";
import { HTTP_STATUS } from "../../../configs/httpStatusCodes";
import log from "../../../logger/log";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_secret_key"
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret_key"
const ACCESS_EXPIRE = "15m";
const REFRESH_EXPIRE = 7 * 24 * 60 * 60; // in seconds

export const generateAccessToken = (userId: number) => {
    return jwt.sign({userId}, JWT_ACCESS_SECRET, {expiresIn: ACCESS_EXPIRE})
}

export const generateRefreshToken = (userId: number) => {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRE });
}


export const saveRefreshToken = async (redis: RedisClientType, userId: number, token: string) => {
    await redis.set(`refresh:${userId}`, token, { EX: REFRESH_EXPIRE });
}

export const verifyRefreshToken = (redis: RedisClientType, userId: number, token: string) => {
    const save = redis.get(`refresh:${userId}`)
}

export const generateNewAccessToken = async (
  redis: RedisClientType,
  refreshToken: string
): Promise<string> => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET
    ) as JwtPayload & { userId: number };

    const userId = decoded.userId;

    const savedToken = await redis.get(`refresh:${userId}`);
    if (!savedToken) {
      throw new AppError(HTTP_STATUS.NOT_FOUND,"No refresh token found");
    }

    if (savedToken !== refreshToken) {
      throw new AppError(HTTP_STATUS.INTERNAL_SERVER_ERROR ,"Refresh token mismatch");
    }

    return generateAccessToken(userId);
  } catch (err: any) {
    log.error("generateNewAccessToken error:", err.message);
    throw new AppError(HTTP_STATUS.BAD_REQUEST, "Refresh token expired or invalid");
  }
};