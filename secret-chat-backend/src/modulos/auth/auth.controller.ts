/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Request, Controller, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { UsuarioCreateDto } from '../usuario/dtos/usuario-create.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AuthService, TokenUser } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
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


    @Post('register-login')
    async registerAndLogin(
        @Body(RegisterUserValidationPipe) newUser: UsuarioCreateDto,
    ): Promise<TokenUser> {
        try {
            return await this.authService.registerAndLogin(newUser);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({ message: 'Server error' });
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req: any): Promise<TokenUser> {
        return this.authService.login(req.user);
    }

    @Post('refresh-token')
    async refreshToken(
        @Body() req: { refreshToken: string }): Promise<Omit<TokenUser, 'user'>> {
        return await this.authService.refreshAccessToken(req.refreshToken);
    }


}
