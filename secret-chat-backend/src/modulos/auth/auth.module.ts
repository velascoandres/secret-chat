import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RegisterUserValidationPipe } from './pipes/register-user-validation.pipe';
import { LocalStrategy } from './strategies/local.trategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';

@Module(
  {
    providers: [
      AuthService,
      RegisterUserValidationPipe,
      LocalStrategy,
      JwtRefreshStrategy,
    ],
    imports: [
      UsuarioModule,
      JwtModule.register({}),
      PassportModule.register({ defaultStrategy: 'local', refresh: 'jwt-refresh' }),
    ],
    controllers: [AuthController]
  },
)
export class AuthModule { }
