import { ApiProperty } from '@nestjs/swagger';
import { BaseMongoDTO } from '@pimba/excalibur/lib';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UsuarioCreateDto extends BaseMongoDTO {

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}