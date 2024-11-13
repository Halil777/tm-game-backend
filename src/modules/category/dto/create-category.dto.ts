import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name_tm: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  desc_tm: string;

  @IsString()
  @IsNotEmpty()
  desc_en: string;

  @IsString()
  @IsNotEmpty()
  desc_ru: string;
}
