import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthService, } from "../auth.service";
import { validateUserWS } from "../utils/validate-user-ws";



@Injectable()
export class WsAuthGuard implements CanActivate {


    constructor(
        private readonly _authService: AuthService,
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const logger = new Logger();
        try {
            const resquest = context.switchToWs().getData();
            const validatedUser = await validateUserWS(resquest, this._authService, logger);
            // If you need to access your user after validate
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