import { Controller, Get } from '@nestjs/common';
import { Param, Query, Req } from '@nestjs/common/decorators';
import { CrudController, CrudOptions } from '@pimba/excalibur/lib';
import { join } from 'path';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { MessageCreateDto } from './dtos/message-create.dto';
import { MessageUpdateDto } from './dtos/message-update.dto';
import { MessageService } from './message.service';

const options: CrudOptions = {
  dtoConfig: {
    createDtoType: MessageCreateDto,
    updateDtoType: MessageUpdateDto,
  },
  useMongo: true,
};

@Controller('message')
export class MessageController extends CrudController(options) {
  constructor(private readonly _messageService: MessageService) {
    super(_messageService);
  }

  @Get('bandeja-mensajes/:destino')
  async bandejaMensajes(
    @Req() request,
    @Query() paginacion: { skip: number; take: number },
    @Param('destino') destino: string,
  ) {
    const usuario: UsuarioEntity = request.user;
    let skip = paginacion?.skip ? paginacion.skip : 0;
    let take = paginacion?.take ? paginacion.take : 30;
    const searchCriteria = {
      $or: [
        {
          destinatario: usuario.id.toString(),
          emisor: destino,
        },
        {
          destinatario: destino,
          emisor: usuario.id.toString(),
        },
      ],
    };
    const [messages, total] = await this._messageService.findAll({
      where: searchCriteria,
      skip,
      take,
      order: {
        _id: 'DESC',
      }
    } as any);
    return {
      messages,
      total,
    };
  }
}
