import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './modulos/usuario/usuario.entity';
import { ChatModule } from './modulos/chat/chat.module';
import { AuthModule } from './modulos/auth/auth.module';
import { MessageEntity } from './modulos/message/message.entity';
import { MessageModule } from './modulos/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mongodb',
        name: 'conexion_mongo',
        database: 'prueba',
        dropSchema: true,
        useUnifiedTopology: true,
        synchronize: true,
        password: '12345678',
        username: 'pimba_man',
        host: 'localhost',
        port: 30503,
        authSource: 'admin',
        entities: [
          UsuarioEntity,
          MessageEntity,
        ],
      },
    ),
    UsuarioModule,
    ChatModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
