import { Controller } from '@nestjs/common';
import { CrudController, CrudGuards, CrudOptions } from '@pimba/excalibur/lib';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioCreateDto } from './dtos/usuario-create.dto';
import { UsuarioUpdateDto } from './dtos/usuario-update.dto';
import {CrudDoc} from '@pimba/excalibur/lib';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';



const options: CrudOptions = {
  dtoConfig: {
    createDtoType: UsuarioCreateDto,
    updateDtoType: UsuarioUpdateDto,
  },
  useMongo: true,
  enableErrorMessages: true,
}


@ApiTags('users')
@CrudGuards(
  {
    findAll: [LocalAuthGuard]
  }
)
@CrudDoc(
  {
    createMany: {
      apiBody: {
        type: [UsuarioCreateDto],
      }
    },
    createOne: {
      apiBody: {
        type: UsuarioCreateDto,
      }
    },
    updateOne: {
      apiBody: {
        type: UsuarioCreateDto,
      }
    },
    findOneById: {
      responses: [
        {
          status: 200,
          type: UsuarioCreateDto,
        },
        {
          status: 400,
          description: 'Invalid ID'
        },
      ]
    },
    deleteOne: {
      responses: [
        {
          status: 200,
          type: UsuarioCreateDto,
        },
        {
          status: 400,
          description: 'Invalid ID'
        },
      ],
    }
  }
)
@Controller('usuario')
export class UsuarioController extends CrudController<UsuarioEntity>(options) {
  constructor(
    private readonly _usuarioService: UsuarioService,
  ) {
    super(
      _usuarioService,
    );
  }
}
