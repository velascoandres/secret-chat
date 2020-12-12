import { IsOptional } from 'class-validator';
import { BaseMongoDTO } from '@pimba/excalibur/lib';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioUpdateDto extends BaseMongoDTO {
  @ApiProperty()
  @IsOptional()
  username: string;
}