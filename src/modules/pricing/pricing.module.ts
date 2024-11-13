import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PricingEntity from './entity/pricing.entity';
import ClientEntity from '../client/entity/client.entity';
import { AppJwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PricingEntity, ClientEntity]),
    AppJwtModule,
    UserModule,
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
