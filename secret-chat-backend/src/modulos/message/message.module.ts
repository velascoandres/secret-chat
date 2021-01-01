import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { MessageEntity } from './message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity], 'conexion_mongo')],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
