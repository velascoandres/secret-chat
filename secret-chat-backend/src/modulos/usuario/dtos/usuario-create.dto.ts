import { BaseMongoDTO } from '@pimba/excalibur/lib';
import { IsNotEmpty } from 'class-validator';

export class UsuarioCreateDto extends BaseMongoDTO {
  @IsNotEmpty()
  nickname: string;
}