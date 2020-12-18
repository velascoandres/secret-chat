/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { INestApplicationContext, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthService, TokenUser } from 'src/modulos/auth/auth.service';
import { jwtConstants } from 'src/modulos/auth/constants';
import { UsuarioEntity } from 'src/modulos/usuario/usuario.entity';
import { ServerOptions } from 'socket.io';

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
                const authToken = request.headers.authorization.replace("Bearer ", "").trim();
                const deco = jwt.verify(authToken, jwtConstants.secret);
                const user: Partial<UsuarioEntity> = jwt.verify(authToken, jwtConstants.secret) as Partial<UsuarioEntity>;
                const validatedUser: Partial<UsuarioEntity> = await this.authService.validateByUsername(
                    user.username,
                );
                // Bonus if you need to access your user after the guard 
                const existeUsuario = Boolean(validatedUser);
                if (existeUsuario) {
                    logger.verbose(`Cliente Autentificado`);
                    return allowFunction(null, true)
                } else {
                    logger.error('WS Unauthorized');
                    return allowFunction(null, false)
                }
            } catch (e) {
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