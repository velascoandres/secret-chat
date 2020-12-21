import { INestApplicationContext, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthService } from 'src/modulos/auth/auth.service';
import { ServerOptions } from 'socket.io';
import { validateUserWS } from 'src/modulos/auth/utils/validate-user-ws';

export class AuthenticatedSocketIoAdapter extends IoAdapter {

    private authService: AuthService;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.authService = app.get(AuthService);
    }

    createIOServer(port: number, options?: ServerOptions): any {


        options.allowRequest = async (request, allowFunction) => {
            const logger = new Logger();
            try {
                const existeUsuario = validateUserWS(request, this.authService);
                if (existeUsuario) {
                    logger.verbose(`Cliente Autentificado`);
                    return allowFunction(null, true)
                } else {
                    logger.error('WS Unauthorized');
                    return allowFunction(null, false)
                }
            } catch (e) {
                console.log(e);
                logger.error('WS Unauthorized');
                return allowFunction("Unauthorized", false)
            }
        }

        return super.createIOServer(port, options);
    }

    close(server) {
        server.close();
    }
}