import { Controller, Get } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { CrudController, CrudOptions } from '@pimba/excalibur/lib';
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

  @Get('bandeja-mensajes')
  async bandejaMensajes(@Req() request) {
    console.log(request.user);
    return 'Hola';
  }
}
