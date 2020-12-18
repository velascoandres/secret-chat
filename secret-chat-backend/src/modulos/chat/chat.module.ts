import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    UsuarioModule,
    AuthModule,
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
