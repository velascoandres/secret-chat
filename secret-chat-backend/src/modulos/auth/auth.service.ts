import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsuarioCreateDto } from '../usuario/dtos/usuario-create.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { jwtConstants, jwtRefreshConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { userInfo } from 'os';


export interface TokenUser {
    access_token: string;
    refresh_token: string;
    user: Partial<UsuarioEntity>
}

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }


    async validateUser(username: string, pass: string): Promise<Omit<UsuarioEntity, 'password' | 'hashPassword'>> {
        const [[user]] = await this.usuarioService.findAll(
            {
                where: {
                    $or: [
                        { username: { '$eq': username } },
                        { email: { '$eq': username }, },
                    ],
                },
            }
        );
        if (!user) return;
        const passwordCorrect = bcrypt.compareSync(pass, user.password);


        console.log(user, passwordCorrect);
        if (user && passwordCorrect) {
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


    async registerAndLogin(newUser: Partial<UsuarioEntity> | UsuarioCreateDto): Promise<TokenUser> {
        await this.usuarioService.createOne(newUser);
        return this.login(newUser as Partial<UsuarioCreateDto>);
    }

    async register(newUser: Partial<UsuarioEntity> | UsuarioCreateDto): Promise<UsuarioEntity> {
        return this.usuarioService.createOne(newUser);
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

    async login(user: Partial<UsuarioCreateDto>): Promise<TokenUser> {
        const payload: Partial<UsuarioEntity> = {
            username: user.username,
            id: user.id,
            email: user.email,
        };
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
            user: payload,
        };
    }

    async refreshAccessToken(refreshToken: string): Promise<TokenUser> {
        try {
            // if (!refreshTokens.includes(refreshToken)) {
            //     throw new UnauthorizedException();
            // }
            const payload = await this.jwtService.verifyAsync<Partial<UsuarioEntity>>(refreshToken, { secret: jwtRefreshConstants.secret });
            const accessToken = this.jwtService.sign(payload,
                {
                    secret: jwtConstants.secret, // unique refresh secret from environment vars
                });

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                user: payload
            };
        } catch (e) {
            const logger = new Logger();
            if (e.name === 'TokenExpiredError') {
                logger.error('Token expirado')
                throw new UnauthorizedException();
            }
            logger.error('Error en la peticion');
            throw new BadRequestException();
        }
    }

}
