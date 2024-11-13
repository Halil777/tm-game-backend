import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PricingEntity, { ClientType } from './entity/pricing.entity';
import { Repository } from 'typeorm';
import CreatePricingDto from './dto/create-pricing.dto';
import { ClientType2 } from '../client/entity/client.entity';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(PricingEntity)
    private readonly pricingRepo: Repository<PricingEntity>,
  ) {}

  async addPricing(body: CreatePricingDto) {
    const type =
      body.clientType == ClientType2.BUISNESS
        ? ClientType.BUISNESS
        : body.clientType == ClientType2.ADVANCED
          ? ClientType.ADVANCED
          : ClientType.BASIC;
    let pricing = await this.pricingRepo.findOneBy({
      clientType: type,
    });
    if (!pricing) {
      pricing = new PricingEntity();
    }
    pricing.clientType = type;
    pricing.desc_en = body.desc_en;
    pricing.desc_ru = body.desc_ru;
    pricing.desc_tm = body.desc_tm;
    pricing.title_en = body.title_en;
    pricing.title_ru = body.title_ru;
    pricing.title_tm = body.title_tm;
    pricing.price = body.price;
    return await this.pricingRepo.save(pricing);
  }

  async getPricing() {
    return await this.pricingRepo.find();
  }

  async deletePricing(id: number) {
    return await this.pricingRepo.delete(id);
  }
}
