import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module(
  {
    providers: [
      AuthService,
    ],
    imports: [
      UsuarioModule,
    ],
    controllers: [AuthController]
  },
)
export class AuthModule { }
