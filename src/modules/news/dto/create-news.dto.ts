import { IsNotEmpty, IsString } from 'class-validator';
import { News } from '../entities/news.entity';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title_tm: string;

  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @IsString()
  @IsNotEmpty()
  title_en: string;

  @IsString()
  @IsNotEmpty()
  sub_title_tm: string;

  @IsString()
  @IsNotEmpty()
  sub_title_en: string;

  @IsString()
  @IsNotEmpty()
  sub_title_ru: string;

  @IsString()
  @IsNotEmpty()
  desc_tm: string;

  @IsString()
  @IsNotEmpty()
  desc_ru: string;

  @IsString()
  @IsNotEmpty()
  desc_en: string;
}
