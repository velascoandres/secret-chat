import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsuarioCreateDto } from '../usuario/dtos/usuario-create.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { jwtConstants, jwtRefreshConstants } from './constants';

// TODO storage
let refreshTokens: string[] = [];
@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }


    async validateUser(username: string, pass: string): Promise<Omit<UsuarioEntity, 'password' | 'hashPassword'>> {
        const user = await this.usuarioService.findOne(
            {
                where: {
                    username,
                },
            }
        );
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateByUsername(username: string): Promise<Omit<UsuarioEntity, 'password' | 'hashPassword'>> {
        const user = await this.usuarioService.findOne(
            {
                where: {
                    username,
                },
            }
        );
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    async register(newUser: Partial<UsuarioEntity> | UsuarioCreateDto): Promise<UsuarioEntity> {
        return await this.usuarioService.createOne(newUser);
    }

    async validateEmail(email: string): Promise<boolean> {
        const user = await this.usuarioService.findOne({
            where: {
                email,
            }
        });
        return !!user;
    }

    async validateUsername(username: string): Promise<boolean> {
        const user = await this.usuarioService.findOne({
            where: {
                username,
            }
        });
        return !!user;
    }

    async login(user: Partial<UsuarioCreateDto>): Promise<{ access_token: string; refresh_token: string; }> {
        const payload = { username: user.username, id: user.id };

        const accessToken = this.jwtService.sign(payload,
            {
                secret: jwtConstants.secret, // unique refresh secret from environment vars
                expiresIn: jwtConstants.expiresIn, // unique refresh expiration from environment vars
            });
        const refreshToken = this.jwtService.sign(payload, {
            secret: jwtRefreshConstants.secret, // unique refresh secret from environment vars
            expiresIn: jwtRefreshConstants.expiresIn, // unique refresh expiration from environment vars
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refreshAccessToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string; }> {
        try {
            // if (!refreshTokens.includes(refreshToken)) {
            //     throw new UnauthorizedException();
            // }
            const payload =  await this.jwtService.verifyAsync<{ username: string; id: string }>(refreshToken, {secret: jwtRefreshConstants.secret });
            const accessToken = this.jwtService.sign(payload,
                {
                    secret: jwtConstants.secret, // unique refresh secret from environment vars
                });
        
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        } catch (e) {
            console.error(e);
            if (e.name === 'TokenExpiredError') {
                throw new UnauthorizedException();
            }
            throw new BadRequestException();
        }
    }

}
