import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractMongoService } from '@pimba/excalibur/lib';
import { MongoRepository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService extends AbstractMongoService<MessageEntity> {
  constructor(
    @InjectRepository(MessageEntity, 'conexion_mongo')
    private readonly _messageRespository: MongoRepository<MessageEntity>,
  ) {
    super(_messageRespository);
  }
}
