import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MensajeInterface } from '../rutas/chat/interfaces/mensaje.interface';
import { UsuarioInterface } from '../rutas/chat/interfaces/usuario.interface';

@Injectable()
export class ChatService {


  constructor(private _socket: Socket) {
  }

  registrarse(
    usuario: UsuarioInterface,
  ) {
    this._socket.emit(
      'chat-general-info',
      usuario,
    );
  }

  get escucharInfoChat(): Observable<any> {
    return this._socket.fromEvent(
      'usuarios-conectados',
    );
  }

  get escucharMensajesSalaGeneral(): Observable<any> {
    return this._socket.fromEvent(
      'chat-general',
    );
  }

  enviarMensajeSalaGeneral(mensaje: Partial<MensajeInterface>) {
    this._socket.emit('intermediario-chat', mensaje);
  }
}
