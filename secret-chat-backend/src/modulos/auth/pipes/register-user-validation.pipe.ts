import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UsuarioCreateDto } from 'src/modulos/usuario/dtos/usuario-create.dto';
import { AuthService } from '../auth.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';


@Injectable()
export class RegisterUserValidationPipe implements PipeTransform {

    constructor(private readonly authService: AuthService) { }

    async transform(newUser: UsuarioCreateDto, metadata: ArgumentMetadata): Promise<UsuarioCreateDto> {
        const userDto = plainToClass(UsuarioCreateDto, newUser);
        const errors = await validate(userDto);
        const hasErrors = errors.length > 0;
        if (hasErrors) throw new BadRequestException({ message: 'Invalid data' });
        const existEmail = await this.authService.validateEmail(userDto.email);
        if (existEmail) throw new BadRequestException({ message: 'The email has been taken from another user' });
        return userDto;
    }
}