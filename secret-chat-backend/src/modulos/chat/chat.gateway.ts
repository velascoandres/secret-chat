import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MensajeInterface } from '../../interfaces/interfaces-types';
import { Utils } from '../../utils';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';

@WebSocketGateway(3001, { namespace: 'chat' })
export class ChatGateway {

  constructor(
    private readonly _usuarioService: UsuarioService,
  ) {
  }

  async encontrarUsuario(nickName: string) {
    const consulta = {
      where: {
        nickname: nickName,
      },
    };
    const respuestaConsulta: [UsuarioEntity[], number] = await this._usuarioService
      .findAll(
        consulta,
      );
    return respuestaConsulta[0][0];
  }

  @SubscribeMessage('intermediario-chat')
  async intermediadioChat(client: Socket, mensaje: MensajeInterface) {
    const esMensajePrivado = !!mensaje.destinatario;
    if (esMensajePrivado) {
      const destinario = mensaje.destinatario;

      const existeUsuario = this.encontrarUsuario(destinario);
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
  async registrarse(client: Socket, usuario: UsuarioEntity) {
    client.emit('chat-general-info', 'todo bien');
    client.broadcast.emit('usuarios-conectados', usuario);
    client.emit('usuarios-conectados', usuario);
  }
}