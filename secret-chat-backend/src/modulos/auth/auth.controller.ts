import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { UsuarioCreateDto } from '../usuario/dtos/usuario-create.dto';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }


    @Post('register')
    async register(
        @Body() newUser: UsuarioCreateDto,
    ): Promise<UsuarioEntity> {
        const userDto = plainToClass(UsuarioCreateDto, newUser);
        const errors = await validate(userDto);
        const hasErrors = errors.length > 0;
        if (hasErrors) throw new BadRequestException({ message: 'Invalid data' });
        try {
            return await this.authService.register(userDto);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({ message: 'Server error' });
        }
    }

}
