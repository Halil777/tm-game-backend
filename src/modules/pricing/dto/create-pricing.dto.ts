import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ClientType2 } from 'src/modules/client/entity/client.entity';

export default class CreatePricingDto {
  @IsString()
  @IsNotEmpty()
  title_tm: string;

  @IsString()
  @IsNotEmpty()
  title_en: string;

  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @IsString()
  @IsNotEmpty()
  desc_tm: string;

  @IsString()
  @IsNotEmpty()
  desc_en: string;

  @IsString()
  @IsNotEmpty()
  desc_ru: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsIn([ClientType2.BASIC, ClientType2.ADVANCED, ClientType2.BUISNESS])
  clientType: string;
}
