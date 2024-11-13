import { Module } from '@nestjs/common';
import { PaymantHistoryService } from './paymant-history.service';
import { PaymantHistoryController } from './paymant-history.controller';

@Module({
  controllers: [PaymantHistoryController],
  providers: [PaymantHistoryService],
})
export class PaymantHistoryModule {}
