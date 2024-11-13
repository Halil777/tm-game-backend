import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import SignInDto from './dto/sign-in.dto';
import { Repository } from 'typeorm';
import UserEntity from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import AppJwtService from '../jwt/jwt.service';
import { PayloadType } from '../jwt/jwt.payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwt: AppJwtService,
  ) {}
  async signIn(body: SignInDto) {
    try {
      const user = await this.userRepo.findOneBy({
        username: body.username,
        password: body.password,
      });
      if (user) {
        return {
          token: this.jwt.generateToken({
            data: {
              id: user.id,
            },
            type: PayloadType.ADMIN,
          }),
        };
      } else {
        throw new UnauthorizedException('User not found');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
