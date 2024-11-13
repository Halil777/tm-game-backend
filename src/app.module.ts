import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './modules/client/client.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { ServerModule } from './modules/server/server.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { PaymantHistoryModule } from './modules/paymant-history/paymant-history.module';
import { GameModule } from './modules/game/game.module';
import CategoryEntity from './modules/category/entity/category.entity';
import ServerEntity from './modules/server/entity/server.entity';
import PricingEntity from './modules/pricing/entity/pricing.entity';
import ClientEntity from './modules/client/entity/client.entity';
import UserEntity from './modules/user/entity/user.entity';
import GameEntity from './modules/game/entity/game.entity';
import GameAssets from './modules/game/entity/game-assets.entity';
import PaymantHistoryEntity from './modules/paymant-history/entity/payment-history.entity';
import { AppJwtModule } from './modules/jwt/jwt.module';
import { KeyModule } from './modules/key/key.module';
import { Key } from './modules/key/entities/key.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewsModule } from './modules/news/news.module';
import { News } from './modules/news/entities/news.entity';
import { GameServerModule } from './modules/game-server/game-server.module';
import { GameServer } from './modules/game-server/entities/game-server.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'QwertyWeb123',
      database: 'tmgame',
      entities: [
        CategoryEntity,
        ServerEntity,
        PricingEntity,
        ClientEntity,
        UserEntity,
        GameEntity,
        GameAssets,
        PaymantHistoryEntity,
        Key,
        News,
        GameServer,
      ],
      synchronize: true,
      logging: true,
    }),
    AppJwtModule,
    ClientModule,
    PricingModule,
    ServerModule,
    CategoryModule,
    UserModule,
    PaymantHistoryModule,
    GameModule,
    KeyModule,
    NewsModule,
    GameServerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
