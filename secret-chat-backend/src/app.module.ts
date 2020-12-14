import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './modulos/usuario/usuario.entity';
import { ChatModule } from './modulos/chat/chat.module';
import { AuthModule } from './modulos/auth/auth.module';
import { UserSubscriber } from './modulos/usuario/user.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mongodb',
        name: 'conexion_mongo',
        database: 'prueba',
        dropSchema: false,
        useUnifiedTopology: true,
        synchronize: true,
        password: '12345678',
        username: 'pimba_man',
        host: 'localhost',
        port: 30503,
        authSource: 'admin',
        entities: [
          UsuarioEntity,
        ],
      },
    ),
    UsuarioModule,
    ChatModule,
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
