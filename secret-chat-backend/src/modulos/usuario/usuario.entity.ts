import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity, Index } from 'typeorm';

@Entity('usuario')
@Index(['username'],{unique: true})
export class UsuarioEntity extends AbstractMongoEntity {
  @Column()
  @Index({unique: true})
  username: string;

  @Column()
  @Index({unique: true})
  email: string;


  @Column()
  password: string;
}