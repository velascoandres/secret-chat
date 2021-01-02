import { AbstractMongoEntity } from '@pimba/excalibur/lib';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity('message')
export class MessageEntity extends AbstractMongoEntity {
  
  @ManyToOne(
    type => UsuarioEntity,
    usuario => usuario.mensajesEmitidos,
  )
  @Column({name: 'destinatario'})
  destinatario: UsuarioEntity | string;


  @ManyToOne(
    type => UsuarioEntity,
    usuario => usuario.mensajesEmitidos,
  )
  @Column({name: 'emisor'})
  emisor: UsuarioEntity | string;

  @Column()
  contenido: string;

  @Column()
  fechaEnvio: string;
}
