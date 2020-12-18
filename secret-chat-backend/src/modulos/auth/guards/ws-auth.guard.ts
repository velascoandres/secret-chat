import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthService, TokenUser } from "../auth.service";
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from "../constants";
import { UsuarioEntity } from "src/modulos/usuario/usuario.entity";



@Injectable()
export class WsAuthGuard implements CanActivate {


    constructor(
        private readonly _authService: AuthService,
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const data = context.switchToWs().getData();
            const authHeader = data.headers.authorization;
            const authToken = authHeader.replace('Bearer', '').trim();
            const { user } = <TokenUser>jwt.verify(authToken, jwtConstants.secret);
            const validatedUser: Partial<UsuarioEntity> = await this._authService.validateUser(
                user.username,
                user.password,
            );
            // Bonus if you need to access your user after the guard 
            context.switchToWs().getData().user = validatedUser;
            return Boolean(validatedUser);
        } catch (error) {
            const logger = new Logger();
            logger.error('WS Unauthorized');
            return false;
        }

    }

}