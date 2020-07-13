import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './modulos/usuario/usuario.entity';
import { ChatModule } from './modulos/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'mongodb',
        name: 'conexion_mongo',
        database: 'base_usuario',
        useNewUrlParser: true,
        dropSchema: true,
        useUnifiedTopology: true,
        synchronize: false,
        url: `mongodb://username:123@localhost:30503/base_usuario?authSource=admin`,
        entities: [
          UsuarioEntity,
        ],
      },
    ),
    UsuarioModule,
    ChatModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
