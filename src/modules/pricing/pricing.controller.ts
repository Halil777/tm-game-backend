import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PricingService } from './pricing.service';
import UserGuard from '../user/user.guard';
import CreatePricingDto from './dto/create-pricing.dto';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post('add')
  @UseGuards(UserGuard)
  addPricing(@Body() body: CreatePricingDto) {
    return this.pricingService.addPricing(body);
  }

  @Get()
  getAll() {
    return this.pricingService.getPricing();
  }

  @Delete('delete-pricing/:id')
  @UseGuards(UserGuard)
  deletePricing(@Param('id') id: string) {
    return this.pricingService.deletePricing(+id);
  }
}
