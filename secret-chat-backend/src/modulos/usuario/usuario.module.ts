import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UserSubscriber } from './user.subscriber';
import { Connection } from 'typeorm';

@Module(
  {
    imports: [
      TypeOrmModule.forFeature(
        [
          UsuarioEntity,
        ],
        'conexion_mongo',
      ),
    ],
    providers: [
      UsuarioService,
      UserSubscriber,
    ],
    controllers: [
      UsuarioController
    ],
    exports: [
      UsuarioService,
    ]
  }
)
export class UsuarioModule {
}
