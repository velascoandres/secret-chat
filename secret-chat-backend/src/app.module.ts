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
        database: 'prueba',
        useNewUrlParser: true,
        dropSchema: true,
        useUnifiedTopology: true,
        synchronize: true,
        url: `mongodb://pimba_man:12345678@localhost:30503/test?authSource=admin`,
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
