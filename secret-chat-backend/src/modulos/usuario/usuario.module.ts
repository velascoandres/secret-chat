import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';

@Module(
  {
    imports: [
      TypeOrmModule.forFeature(
        [
          UsuarioEntity,
        ],
        'conexion_mongo',
      )
    ],
    providers: [
      UsuarioService,
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
