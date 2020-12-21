import { Injectable } from '@nestjs/common';
import { AbstractMongoService } from '@pimba/excalibur/lib';
import { UsuarioEntity } from './usuario.entity';
import { FindConditions, FindManyOptions, MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

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

  find(conditions: FindManyOptions<UsuarioEntity>): Promise<UsuarioEntity[]> {
    return this._usuarioRepository.find(conditions);
  }
}
