import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { jwtConstants } from "../constants";

@Injectable()
export class WsAuthStrategy extends PassportStrategy(
    Strategy,
    'ws-auth-strategy',
) {
    constructor(
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret, // gets secret from environment variables
        });
    }

    async validate(payload: { username: string; id: string }): Promise<any> {
        console.log('el payload', payload);
        const { username } = payload;
        const user = await this.authService.validateByUsername(username);
        if (!user) {
            throw new WsException({error: 'not authorized'});
        }
        return user;
    }
}