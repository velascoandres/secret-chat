import { SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

export const CONFIGURACION_WEBSOCKET_CHAT: SocketIoConfig =
  {
    url: `${environment.protocolo}://${environment.dominio}:${environment.puerto}/chat`,
    options: {},
  };
