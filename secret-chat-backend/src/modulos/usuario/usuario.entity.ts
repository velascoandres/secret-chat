import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity, Index } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity extends AbstractMongoEntity {
  @Column(
    {
      unique: true,
      name: 'username'
    }
  )
  username: string;

  @Column(
    {
      unique: true,
    }
  )
  email: string;

  @Column()
  password: string;

  @Column(
    {
      type: 'boolean',
      default: false,
    }
  )
  online = false;

  // @BeforeInsert()
  // hashPassword(): void {
  //   console.log('trigered');
  //   const salt = bcrypt.genSaltSync();
  //   this.password = bcrypt.hashSync(this.password, salt);
  // }
}