import { Controller } from '@nestjs/common';
import { PaymantHistoryService } from './paymant-history.service';

@Controller('paymant-history')
export class PaymantHistoryController {
  constructor(private readonly paymantHistoryService: PaymantHistoryService) {}
}
