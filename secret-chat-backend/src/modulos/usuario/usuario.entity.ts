import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { MessageEntity } from '../message/message.entity';

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
  

  @OneToMany(type => MessageEntity, mensaje => mensaje.emisor)
  mensajesEmitidos: MessageEntity[];  


  @OneToMany(type => MessageEntity, mensaje => mensaje.destinatario)
  mensajesRecibidos: MessageEntity[];  

  // @BeforeInsert()
  // hashPassword(): void {
  //   console.log('trigered');
  //   const salt = bcrypt.genSaltSync();
  //   this.password = bcrypt.hashSync(this.password, salt);
  // }
}