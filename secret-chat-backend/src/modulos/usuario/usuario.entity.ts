import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity, Index } from 'typeorm';

@Entity('usuario')
@Index(['nickname'],{unique: true})
export class UsuarioEntity extends AbstractMongoEntity {
  @Column()
  @Index({unique: true})
  nickname: string;
}