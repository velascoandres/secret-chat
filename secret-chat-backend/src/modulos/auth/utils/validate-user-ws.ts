import { Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from 'src/modulos/usuario/usuario.entity';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';

export async function validateUserWS(request: any, authService: AuthService, logger: Logger): Promise<Partial<UsuarioEntity> | undefined> {
    try {
        const user = getUserFromToken(request);
        return await authService.validateByUsername(
            user.username,
        );
    } catch (error) {
        const isTokenExpired = error instanceof jwt.TokenExpiredError;
        if (isTokenExpired) logger.warn('Expired token for websockets');
        logger.error('Error on validate token');
        return undefined;
    }

}

export function getUserFromToken(request) {
    const authHeader = request.headers.authorization;
    const authToken = authHeader.replace('Bearer', '').trim();
    const user: Partial<UsuarioEntity> = jwt.verify(authToken, jwtConstants.secret) as Partial<UsuarioEntity>;
    return user;
}