import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ChatComponent } from '../../rutas/chat/chat.component';
import { ChatService } from '../../servicios/chat.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { UsuarioInterface } from '../../rutas/chat/interfaces/usuario.interface';

@Component({
  selector: 'app-preguntar-nickname',
  templateUrl: './preguntar-nickname.component.html',
  styleUrls: ['./preguntar-nickname.component.css'],
})
export class PreguntarNicknameComponent implements OnInit {
  nickname: string;
  constructor(
    protected dialogRef: NbDialogRef<ChatComponent>,
    private readonly _chatService: ChatService,
    private _toastrService: NbToastrService,
    private readonly _usuarioService: UsuarioService,
  ) {

  }

  ngOnInit(): void {
  }

  registrarUsuario(
  ) {
    const respuestaCrear$ = this._usuarioService.crearUno(
      {
        nickname: this.nickname,
      },
    );
    respuestaCrear$
      .subscribe(
        (usuarioCreado: UsuarioInterface) => {
          this._chatService.registrarse(usuarioCreado);
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
        },
        error => {
          console.log(error);
          this._toastrService.danger(
            'Error al crear usuario, pruebe con otro nickname',
            'Error',
            {
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              destroyByClick: true,
            },
          );
        }
      );
  }

}
