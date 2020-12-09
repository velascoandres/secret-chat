import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('usuario')
@Index(['username', 'email'], {unique: true})
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
      type: 'boolean',
      default: false,
      nullable: true,
    }
  )
  online: boolean;

  // @BeforeInsert()
  // hashPassword(): void {
  //   console.log('trigered');
  //   const salt = bcrypt.genSaltSync();
  //   this.password = bcrypt.hashSync(this.password, salt);
  // }
}