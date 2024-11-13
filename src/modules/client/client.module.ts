import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ClientEntity from './entity/client.entity';
import { AppJwtModule } from '../jwt/jwt.module';
import { Key } from '../key/entities/key.entity';
import PaymantHistoryEntity from '../paymant-history/entity/payment-history.entity';
import PricingEntity from '../pricing/entity/pricing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      Key,
      PaymantHistoryEntity,
      PricingEntity,
    ]),
    AppJwtModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
