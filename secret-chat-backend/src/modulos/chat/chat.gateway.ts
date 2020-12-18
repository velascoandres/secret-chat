import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MensajeInterface } from '../../interfaces/interfaces-types';
import { Utils } from '../../utils';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../auth/guards/ws-auth.guard';

@UseGuards(WsAuthGuard)
@WebSocketGateway(3001, { namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection {

  constructor(
    private readonly _usuarioService: UsuarioService,
  ) {
  }



  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleConnection(client: any): void {
    const logger = new Logger();
    logger.verbose('Cliente conectado al gateway: chat');
  }

  async encontrarUsuario(username: string): Promise<UsuarioEntity> {
    const consulta = {
      where: {
        $or: [
          { username: { '$eq': username } },
          { email: { '$eq': username }, },
        ],
      },
    };
    const respuestaConsulta: [UsuarioEntity[], number] = await this._usuarioService
      .findAll(
        consulta,
      );
    return respuestaConsulta[0][0];
  }

  @SubscribeMessage('intermediario-chat')
  intermediadioChat(client: Socket, mensaje: MensajeInterface): void {
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
  registrarse(client: Socket, usuario: UsuarioEntity): void {
    client.emit('chat-general-info', 'todo bien');
    client.broadcast.emit('usuarios-conectados', usuario);
    client.emit('usuarios-conectados', usuario);
  }
}