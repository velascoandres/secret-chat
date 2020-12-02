import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RegisterUserValidationPipe } from './pipes/register-user-validation.pipe';
import { LocalStrategy } from './strategies/local.trategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module(
  {
    providers: [
      AuthService,
      RegisterUserValidationPipe,
      LocalStrategy,
    ],
    imports: [
      UsuarioModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }),
    ],
    controllers: [AuthController]
  },
)
export class AuthModule { }
