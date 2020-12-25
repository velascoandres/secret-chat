import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MensajeInterface } from '../../interfaces/interfaces-types';
import { Utils } from '../../utils';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../auth/guards/ws-auth.guard';
import { AuthService } from '../auth/auth.service';
import { getUserFromToken } from '../auth/utils/validate-user-ws';
import { OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway(3001, { namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _authService: AuthService,
  ) {
  }

  private async _handleConnDisconn(client: Socket, isConn: boolean) {
    try {
      const request = client.handshake;
      const user = await getUserFromToken(request);
      const userId = user.id;
      const userToUpdate: any = { ...user, online: isConn };
      const updateRespose = await this._usuarioService.updateOne(userId.toString(), userToUpdate);
      client.join(userId.toString());
    } catch (error) {
      client.disconnect();
    }

  }


  async handleConnection(client: any): Promise<void> {
    const logger = new Logger();
    this._handleConnDisconn(client, true);
    logger.verbose('Cliente conectado al gateway: chat');
  }

  handleDisconnect(client: any) {
    const logger = new Logger();
    this._handleConnDisconn(client, false);
    logger.warn('Cliente desconectado del gateway: chat');
  }



  async encontrarUsuario(id: string): Promise<UsuarioEntity> {
    const consulta = {
      where: {
        id: { '$eq': id },
      },
    };
    const [[usuario]] = await this._usuarioService
      .findAll(
        consulta,
      );
    return usuario;
  }

  @SubscribeMessage('mensaje-personal')
  async chat(client: Socket, mensaje: MensajeInterface) {
    const destinario = mensaje.destinatario;
    const existeUsuario = await this.encontrarUsuario(destinario);
    if (existeUsuario) {
      // Enviamos el mensaje al destinario por su canal personal
      mensaje.fechaEnvio = Utils.obtenerFechaActual;
      client.broadcast.to(destinario).emit('mensaje-personal', mensaje);
    } else {
      throw new WsException('No existe un usuario con ese nombre!!');
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('chat-general-info')
  registrarse(client: Socket, usuario: UsuarioEntity): void {
    client.emit('chat-general-info', 'todo bien');
    client.broadcast.emit('usuarios-conectados', usuario);
    client.emit('usuarios-conectados', usuario);
  }
}