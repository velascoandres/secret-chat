import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../servicios/chat.service';
import { MensajeInterface } from './interfaces/mensaje.interface';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { PreguntarNicknameComponent } from '../../modales/preguntar-nickname/preguntar-nickname.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  nickName: string;
  usuariosRegistrados: string[] = [];
  mensajes: MensajeInterface[] = [];

  escuchadorListaUsuario$ = this._chatService.escucharInfoChat;
  escuchadorMensajesGeneral$ = this._chatService.escucharMensajesSalaGeneral;

  constructor(
    private readonly _chatService: ChatService,
    private _dialogService: NbDialogService,
    private _toasterService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.escucharListaUsaurios();
    this.escucharMensajesSalaGeneral();
  }

  enviarNickName() {
    this._chatService.registrarse(this.nickName);
  }

  abrirModal() {
    this._dialogService
      .open(
        PreguntarNicknameComponent,
        {
          closeOnBackdropClick: false,
          hasBackdrop: true,
        },
      )
      .onClose
      .subscribe(
        (respuesta: { nickname: string }) => {
          this.nickName = respuesta.nickname;
        },
      );
  }

  enviarMensajeSalaGeneral(evento: { message: string, files: any }) {
    const mensaje: Partial<MensajeInterface> = {
      emisor: this.nickName,
      contenido: evento.message,
      respuesta: false,
    };
    this._chatService.enviarMensajeSalaGeneral(mensaje);
  }

  private escucharMensajesSalaGeneral() {
    this.escuchadorMensajesGeneral$
      .subscribe(
        (mensaje: MensajeInterface) => {
          mensaje.fechaEnvio = new Date(mensaje.fechaEnvio);
          mensaje.respuesta = mensaje.emisor === this.nickName;
          this.mensajes.push(mensaje);
        },
      );
  }

  private escucharListaUsaurios() {
    this.escuchadorListaUsuario$
      .subscribe(
        (mensaje: MensajeInterface) => {
          this._toasterService
            .info(
              `${mensaje.contenido} se ha unido a la sala`,
              'Info',
              {
                destroyByClick: true,
                position: NbGlobalPhysicalPosition.TOP_LEFT,
              },
            );
          this.usuariosRegistrados.push(mensaje.contenido);
        },
      );
  }

  ngAfterViewInit(): void {
    this.abrirModal();
  }
}
