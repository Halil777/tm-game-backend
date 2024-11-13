import { Module } from '@nestjs/common';
import { GameServerService } from './game-server.service';
import { GameServerController } from './game-server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameServer } from './entities/game-server.entity';
import { AppJwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameServer]), AppJwtModule, UserModule],
  controllers: [GameServerController],
  providers: [GameServerService],
})
export class GameServerModule {}
