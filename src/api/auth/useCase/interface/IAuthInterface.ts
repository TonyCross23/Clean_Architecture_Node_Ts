import { RedisClientType } from "redis";

export interface IAuthInterface { 
    login(input: any, redis: RedisClientType): any;
    register(input: any): any;
    logout(refreshToken: string,accessToken: string, redis: RedisClientType): any;
    refreshToken(refreshToken: string,  redis: RedisClientType): any;
}