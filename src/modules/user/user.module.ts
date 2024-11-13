import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entity/user.entity';
import { AppJwtModule } from '../jwt/jwt.module';
import UserGuard from './user.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AppJwtModule],
  controllers: [UserController],
  providers: [UserService, UserGuard],
  exports: [UserGuard],
})
export class UserModule {}
