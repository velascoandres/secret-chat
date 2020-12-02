import { Injectable } from '@nestjs/common';
import { UsuarioCreateDto } from '../usuario/dtos/usuario-create.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
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

}
