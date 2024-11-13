import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryEntity from './entity/category.entity';
import { UserModule } from '../user/user.module';
import { AppJwtModule } from '../jwt/jwt.module';
import GameEntity from '../game/entity/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, GameEntity]),
    AppJwtModule,
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
