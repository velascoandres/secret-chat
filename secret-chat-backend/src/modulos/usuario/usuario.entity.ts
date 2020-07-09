import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity extends AbstractMongoEntity {
  @Column(
    {
      type: 'varchar',
      unique: true,
    },
  )
  nickname: string;
}