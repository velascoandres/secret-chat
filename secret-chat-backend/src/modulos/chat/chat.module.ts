import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
  ],
  providers: [
    ChatService,
    ChatGateway,
  ],
  controllers: [
    ChatController
  ],
})
export class ChatModule {
}
