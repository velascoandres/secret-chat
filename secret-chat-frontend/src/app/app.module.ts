import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './rutas/chat/chat.component';
import { ChatService } from './servicios/chat.service';
import { FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { CONFIGURACION_WEBSOCKET_CHAT } from './constantes/websockets';
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule, NbDialogModule, NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbSidebarModule,
  NbThemeModule, NbToastrModule, NbUserModule,
} from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreguntarNicknameComponent } from './modales/preguntar-nickname/preguntar-nickname.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PreguntarNicknameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(CONFIGURACION_WEBSOCKET_CHAT),
    NbThemeModule.forRoot(
      {
        name: 'dark',
      },
    ),
    NbLayoutModule,
    NbChatModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbInputModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
  ],
  providers: [
    ChatService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
