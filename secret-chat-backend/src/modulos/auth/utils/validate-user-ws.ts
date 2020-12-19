import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from 'src/modulos/usuario/usuario.entity';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';

export async function validateUserWS(request: any, authService: AuthService): Promise<Boolean> {
    const authToken = request.headers.authorization.replace("Bearer ", "").trim();
    const deco = jwt.verify(authToken, jwtConstants.secret);
    const user: Partial<UsuarioEntity> = jwt.verify(authToken, jwtConstants.secret) as Partial<UsuarioEntity>;
    const validatedUser: Partial<UsuarioEntity> = await authService.validateByUsername(
        user.username,
    );
    // Bonus if you need to access your user after the guard 
    return Boolean(validatedUser);
}