import { Controller } from '@nestjs/common';
import { ApiMongoController } from '@pimba/excalibur/lib';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioCreateDto } from './dtos/usuario-create.dto';
import { UsuarioUpdateDto } from './dtos/usuario-update.dto';

@Controller('usuario')
export class UsuarioController extends ApiMongoController<UsuarioEntity> {
  constructor(
    private readonly _usuarioService: UsuarioService,
  ) {
    super(
      _usuarioService,
      {
        createDtoType: UsuarioCreateDto,
        updateDtoType: UsuarioUpdateDto,
      },
    );
  }
}
