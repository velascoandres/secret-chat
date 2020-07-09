import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ChatComponent } from '../../rutas/chat/chat.component';
import { ChatService } from '../../servicios/chat.service';

@Component({
  selector: 'app-preguntar-nickname',
  templateUrl: './preguntar-nickname.component.html',
  styleUrls: ['./preguntar-nickname.component.css'],
})
export class PreguntarNicknameComponent implements OnInit {
  nickname: string;
  respuestaChatInfo$ = this._chatService.escucharRespuestaChatInfo;

  constructor(
    protected dialogRef: NbDialogRef<ChatComponent>,
    private readonly _chatService: ChatService,
    private _toastrService: NbToastrService,
  ) {

  }

  ngOnInit(): void {
    this.respuestaChatInfo$
      .subscribe(
        (respuesta: { mensaje: string, error: boolean }) => {
          if (respuesta.error) {
            this._toastrService.danger(
              'Ya existe un usuario con ese nombre',
              'Error',
              {
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                destroyByClick: true,
              },
            );
          } else {
            this._toastrService.success(
              'Bienvenido al chat!!',
              'Exito',
              {
                position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                destroyByClick: true,
              },
            );
            this.dialogRef.close(
              { nickname: this.nickname },
            );
          }
        },
      );
  }

  enviarDatos() {
    this._chatService.registrarse(this.nickname);
  }

}
