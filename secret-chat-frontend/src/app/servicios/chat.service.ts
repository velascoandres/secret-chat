import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MensajeInterface } from '../rutas/chat/interfaces/mensaje.interface';

@Injectable()
export class ChatService {


  constructor(private _socket: Socket) {
  }

  registrarse(
    nickname: string,
  ) {
    const respuesta = this._socket.emit(
      'chat-general-info',
      nickname,
      (respuesta) => {
        console.log(respuesta);
      },
    );
    console.log(respuesta);
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

  get escucharRespuestaChatInfo(): Observable<any> {
    return this._socket.fromEvent(
      'chat-general-info',
    );
  }
}
