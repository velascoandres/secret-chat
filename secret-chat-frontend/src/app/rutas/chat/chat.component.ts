import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../servicios/chat.service';
import { MensajeInterface } from './interfaces/mensaje.interface';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { PreguntarNicknameComponent } from '../../modales/preguntar-nickname/preguntar-nickname.component';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioInterface } from './interfaces/usuario.interface';
import { RespuestaConsultaInterface } from './interfaces/respuesta-consulta.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  nickName: string;
  usuariosRegistrados: UsuarioInterface[] = [];
  mensajes: MensajeInterface[] = [];

  escuchadorListaUsuario$ = this._chatService.escucharInfoChat;
  escuchadorMensajesGeneral$ = this._chatService.escucharMensajesSalaGeneral;

  constructor(
    private readonly _chatService: ChatService,
    private _dialogService: NbDialogService,
    private _toasterService: NbToastrService,
    private readonly _usuarioService: UsuarioService,
  ) {
  }

  ngOnInit(): void {
  }

  consultarUsuariosRegistrados() {
    const respuesta$ = this._usuarioService.encontrarTodos({});
    respuesta$
      .subscribe(
        (respuesta: RespuestaConsultaInterface<UsuarioInterface>) => {
          this.usuariosRegistrados = respuesta.data;
        }
      );
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
          this.consultarUsuariosRegistrados();
          this.escucharListaUsaurios();
          this.escucharMensajesSalaGeneral();
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
        (usuario: UsuarioInterface) => {
          this._toasterService
            .info(
              `${usuario.nickname} se ha unido a la sala`,
              'Info',
              {
                destroyByClick: true,
                position: NbGlobalPhysicalPosition.TOP_LEFT,
              },
            );
          this.usuariosRegistrados.push(usuario);
        },
      );
  }

  ngAfterViewInit(): void {
    this.abrirModal();
  }
}
