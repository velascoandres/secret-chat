import { IsNotEmpty } from 'class-validator';
import { BaseMongoDTO } from '@pimba/excalibur/lib';

export class UsuarioUpdateDto extends BaseMongoDTO {
  @IsNotEmpty()
  nickname: string;
}