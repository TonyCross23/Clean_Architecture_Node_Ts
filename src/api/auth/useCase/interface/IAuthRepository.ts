import { RedisClientType } from "redis";
import { AuthResponse, User } from "../../entities/auth.entity";

export interface IAuthRepository { 
    login(data: User,redis: RedisClientType): Promise<AuthResponse>;
    register(data: User): Promise<User>;
    logout(refreshToken: string, accessToken: string, redis: RedisClientType): Promise<void>;
    refreshToken(refreshToken: string, redis: RedisClientType): Promise<string>;
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}