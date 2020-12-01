import { BaseMongoDTO } from '@pimba/excalibur/lib';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsuarioCreateDto extends BaseMongoDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}