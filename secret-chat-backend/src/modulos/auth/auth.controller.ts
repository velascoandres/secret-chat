import { Body, Controller, InternalServerErrorException, Post, UsePipes } from '@nestjs/common';
import { UsuarioCreateDto } from '../usuario/dtos/usuario-create.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AuthService } from './auth.service';
import { RegisterUserValidationPipe } from './pipes/register-user-validation.pipe';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    async register(
        @Body(RegisterUserValidationPipe) newUser: UsuarioCreateDto,
    ): Promise<UsuarioEntity> {
        try {
            return await this.authService.register(newUser);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({ message: 'Server error' });
        }
    }

}
