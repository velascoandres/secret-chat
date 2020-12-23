import { Module } from '@nestjs/common';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RegisterUserValidationPipe } from './pipes/register-user-validation.pipe';
import { LocalStrategy } from './strategies/local.trategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { WsAuthGuard } from './guards/ws-auth.guard';
import { WsAuthStrategy } from './strategies/ws-auth.strategy';
import { forwardRef } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module(
  {
    providers: [
      AuthService,
      RegisterUserValidationPipe,
      LocalStrategy,
      JwtRefreshStrategy,
      WsAuthGuard,
      WsAuthStrategy,
      LocalAuthGuard,
      JwtStrategy,
    ],
    imports: [
      forwardRef(() => UsuarioModule),
      JwtModule.register({}),
      PassportModule.register({ defaultStrategy: 'local', refresh: 'jwt-refresh' }),
    ],
    controllers: [
      AuthController,
    ],
    exports: [
      WsAuthGuard,
      AuthService,
      LocalStrategy,
      LocalAuthGuard,
      JwtStrategy,
    ]
  },
)
export class AuthModule { }
