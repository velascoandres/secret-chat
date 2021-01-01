import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { MessageEntity } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../auth/middleware/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity], 'conexion_mongo'),
    AuthModule,
  ],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'message/bandeja-mensajes/:destino', method: RequestMethod.GET },
      );
  }
}
