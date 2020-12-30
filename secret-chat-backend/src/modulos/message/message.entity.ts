import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import {
  Column,
  Entity,
  Index,
} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('message')
@Index(['destinatario', 'emisor'])
export class MessageEntity extends AbstractMongoEntity {
  
  @Column()
  destinatario: UsuarioEntity;

  @Column()
  emisor: UsuarioEntity;

  @Column()
  contenido: string;

  @Column()
  fechaEnvio: string;
}
