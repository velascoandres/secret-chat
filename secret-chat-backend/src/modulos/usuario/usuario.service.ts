import { Injectable } from '@nestjs/common';
import { AbstractMongoService } from '@pimba/excalibur/lib';
import { UsuarioEntity } from './usuario.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService extends AbstractMongoService<UsuarioEntity> {
  constructor(
    @InjectRepository(UsuarioEntity, 'conexion_mongo')
    private readonly _usuarioRepository: MongoRepository<UsuarioEntity>,
  ) {
    super(
      _usuarioRepository,
    );
  }
}
