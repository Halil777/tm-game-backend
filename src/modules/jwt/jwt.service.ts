import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import JwtPayload from './jwt.payload';

@Injectable()
export default class AppJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(data: JwtPayload): string {
    return this.jwtService.sign(data);
  }

  getPayload(token: string) {
    return this.jwtService.verify(token);
  }
}
