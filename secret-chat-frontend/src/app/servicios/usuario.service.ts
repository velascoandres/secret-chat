import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaConsultaInterface } from '../rutas/chat/interfaces/respuesta-consulta.interface';
import { UsuarioInterface } from '../rutas/chat/interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {
  url: string = `${environment.protocolo}://${environment.dominio}:${environment.puerto}`;
  segmento: string = 'usuario';
  uri: string = this.url + '/' + this.segmento;

  constructor(
    private readonly _httpClient: HttpClient,
  ) {
  }

  encontrarTodos(
    parametrosBusqueda: { [k in string]: string },
  ): Observable<RespuestaConsultaInterface<UsuarioInterface>> {
    return this._httpClient.get(
      this.uri,
      {
        params: {
          query: JSON.stringify(parametrosBusqueda),
        },
      },
    ) as Observable<RespuestaConsultaInterface<UsuarioInterface>>;
  }
  crearUno(nuevoUsuario: UsuarioInterface): Observable<UsuarioInterface> {
    return this._httpClient.post(
      this.uri,
      nuevoUsuario,
    ) as Observable<UsuarioInterface>;
  }
}
