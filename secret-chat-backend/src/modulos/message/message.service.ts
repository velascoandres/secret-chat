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

  async guardarMensajeDesdeChat(mensaje: Partial<MessageEntity>) {
    try {
      const mensajeCreado = await this._messageRespository.save(mensaje);
      return await this._messageRespository.findOne({
        where: {
          _id: mensajeCreado.id,
        },
        select: ['id','emisor']
      });
    } catch (error) {
      console.error({
        error,
        mensaje: 'Error al crear el mensaje',
        data: mensaje,
      });
      throw new Error('Error al crear el mensaje');
    }
  }
}
