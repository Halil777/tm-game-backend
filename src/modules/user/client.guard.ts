import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AppJwtService from '../jwt/jwt.service';
import { PayloadType } from '../jwt/jwt.payload';

@Injectable()
export default class ClientGuard implements CanActivate {
  constructor(private readonly jwt: AppJwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const header = context.switchToHttp().getRequest().headers[
        'authorization'
      ];
      const token = header.split(' ')[1];
      const payload = this.jwt.getPayload(token);
      if (payload.type == PayloadType.CLIENT && payload.data.id) {
        context.switchToHttp().getRequest()['client'] = payload.data;
        return true;
      }
    } catch (err) {
      throw new ForbiddenException('Header token not found');
    }
    return false;
  }
}
