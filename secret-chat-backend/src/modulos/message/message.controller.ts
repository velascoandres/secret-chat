import { Controller } from '@nestjs/common';
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
}
