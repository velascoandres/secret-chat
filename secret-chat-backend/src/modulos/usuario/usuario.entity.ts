import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity, Index } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity extends AbstractMongoEntity {
  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column(
    {
      default: false,
      nullable: true,
    }
  )
  online: boolean;
}