import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { validateUserWS } from '../utils/validate-user-ws';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const logger = new Logger();
    const user = await validateUserWS(req, this.authService, logger);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
