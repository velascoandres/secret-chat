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
        const logger = new Logger();
        try {
            const data = context.switchToWs().getData();
            const authHeader = data.headers.authorization;
            const authToken = authHeader.replace('Bearer', '').trim();
            const user: Partial<UsuarioEntity> = jwt.verify(authToken, jwtConstants.secret) as Partial<UsuarioEntity>;
            const validatedUser: Partial<UsuarioEntity> = await this._authService.validateByUsername(
                user.username,
            );
            // Bonus if you need to access your user after the guard 
            context.switchToWs().getData().user = validatedUser;
            const existeUsuario = Boolean(validatedUser);
            if (existeUsuario) {
                logger.verbose(`Cliente Autentificado`);
            } else {
                logger.error('WS Unauthorized');
            }
            return existeUsuario;
        } catch (error) {
            logger.error('WS Unauthorized');
            return false;
        }

    }

}