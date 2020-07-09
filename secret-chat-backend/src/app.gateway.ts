import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Utils } from './utils';
import { MensajeInterface } from './interfaces/interfaces-types';
import { BadRequestException } from '@nestjs/common';

@WebSocketGateway(3001, { namespace: 'chat' })
export class AppGateway {

  usuariosActivos: string[] = [];

  @SubscribeMessage('intermediario-chat')
  intermediadioChat(client: Socket, mensaje: MensajeInterface) {
    const esMensajePrivado = !!mensaje.destinatario;
    console.log('es', esMensajePrivado);
    if (esMensajePrivado) {
      const destinario = mensaje.destinatario;
      const existeUsuario = Utils.existeUsuario(this.usuariosActivos, destinario);
      if (existeUsuario) {
        // Enviamos el mensaje al destinario por su canal personal
        mensaje.fechaEnvio = Utils.obtenerFechaActual;
        client.to(destinario).emit(
          'chat',
          mensaje,
        );
      } else {
        client.send(
          {
            mensaje: 'No existe un usuario con ese nombre!!',
            error: true,
          },
        );
      }
    } else {
      mensaje.fechaEnvio = Utils.obtenerFechaActual;
      client.broadcast.emit('chat-general', mensaje);
      client.emit('chat-general', mensaje);
    }
  }

  @SubscribeMessage('chat-general-info')
  registrarse(client: Socket, nickName: string) {
    // verificar si existe
    const existeUsuario = Utils.existeUsuario(this.usuariosActivos, nickName);
    if (existeUsuario) {
      client.emit('chat-general-info', {
          mensaje: 'El ya existe alguien registrado con ese nombre!!',
          error: true,
        },
      );
      // throw new BadRequestException(
      //   {
      //     mensaje: 'Ya existe alguien registrado con ese nombre!!',
      //   },
      // );
    } else {
      this.usuariosActivos.push(nickName);
      const contenido = nickName;
      const fecha = Utils.obtenerFechaActual;
      const mensaje: MensajeInterface = {
        emisor: 'servidor',
        fechaEnvio: fecha,
        contenido,
      };
      console.log('alguien se ha unido');
      client.emit('chat-general-info', 'todo bien');
      client.broadcast.emit('usuarios-conectados', mensaje);
      client.emit('usuarios-conectados', mensaje);
    }
  }


}