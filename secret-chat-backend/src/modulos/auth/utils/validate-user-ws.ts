import { Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from 'src/modulos/usuario/usuario.entity';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';

export async function validateUserWS(request: any, authService: AuthService): Promise<Partial<UsuarioEntity> | undefined> {
    try {
        const authHeader = request.headers.authorization;
        const authToken = authHeader.replace('Bearer', '').trim();
        const user: Partial<UsuarioEntity> = jwt.verify(authToken, jwtConstants.secret) as Partial<UsuarioEntity>;
        return await authService.validateByUsername(
            user.username,
        );
    } catch (error) {
        const logger = new Logger();
        const isTokenExpired = error instanceof jwt.TokenExpiredError;
        if (isTokenExpired) logger.warn('Expired token for websockets');
        logger.error('Error on validate token', error);
        return undefined;
    }

}