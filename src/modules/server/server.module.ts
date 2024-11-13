import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ServerEntity from './entity/server.entity';
import CategoryEntity from '../category/entity/category.entity';
import GameEntity from '../game/entity/game.entity';
import { AppJwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity, CategoryEntity, GameEntity]),
    AppJwtModule,
    UserModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
