import { inject, injectable } from "inversify";
import { IAuthInterface } from "../interface/IAuthInterface";
import { IAuthRepository } from "../interface/IAuthRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { RedisClientType } from "redis";

@injectable()
export class AuthInteractor implements IAuthInterface {

    constructor (
       @inject(INTERFACE_TYPE.AuthRepository) private repository: IAuthRepository
    ) {
        this.repository = repository;
    }

    login(input: any,redis: RedisClientType) {
        return this.repository.login(input, redis);
    }
    register(input: any) {
        return this.repository.register(input);
    }
    logout(refreshToken: string,accessToken: string, redis: RedisClientType) {
        return this.repository.logout(refreshToken,accessToken, redis);
    }
    refreshToken(refreshToken: string, redis: RedisClientType) {
        return this.repository.refreshToken(refreshToken, redis);
    }
    
}