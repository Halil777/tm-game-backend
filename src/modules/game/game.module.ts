import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameEntity from './entity/game.entity';
import GameAssets from './entity/game-assets.entity';
import CategoryEntity from '../category/entity/category.entity';
import { AppJwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity, GameAssets, CategoryEntity]),
    AppJwtModule,
    UserModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
