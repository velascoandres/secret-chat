import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RegisterUserValidationPipe } from './pipes/register-user-validation.pipe';

@Module(
  {
    providers: [
      AuthService,
      RegisterUserValidationPipe,
    ],
    imports: [
      UsuarioModule,
    ],
    controllers: [AuthController]
  },
)
export class AuthModule { }
