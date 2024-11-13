import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}
  async create(image: string, createNewsDto: CreateNewsDto) {
    const news = new News();
    news.title_tm = createNewsDto.title_tm;
    news.title_en = createNewsDto.title_en;
    news.title_ru = createNewsDto.title_ru;
    news.sub_title_en = createNewsDto.sub_title_en;
    news.sub_title_ru = createNewsDto.sub_title_ru;
    news.sub_title_tm = createNewsDto.sub_title_tm;
    news.desc_ru = createNewsDto.desc_ru;
    news.desc_tm = createNewsDto.desc_tm;
    news.desc_en = createNewsDto.desc_en;
    news.image = image;
    console.dir(news);
    return await this.newsRepo.save(news);
  }

  findAll() {
    return this.newsRepo.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async update(
    id: number,
    image: string | undefined,
    updateNewsDto: UpdateNewsDto,
  ) {
    const news = await this.newsRepo.findOneBy({ id: id });
    if (news) {
      if (updateNewsDto.desc_en) news.desc_en = updateNewsDto.desc_en;
      if (updateNewsDto.desc_ru) news.desc_ru = updateNewsDto.desc_ru;
      if (updateNewsDto.desc_tm) news.desc_tm = updateNewsDto.desc_tm;
      if (updateNewsDto.title_en) news.title_en = updateNewsDto.title_en;
      if (updateNewsDto.title_ru) news.title_ru = updateNewsDto.title_ru;
      if (updateNewsDto.title_tm) news.title_tm = updateNewsDto.title_tm;
      if (updateNewsDto.sub_title_en)
        news.sub_title_en = updateNewsDto.sub_title_en;
      if (updateNewsDto.sub_title_ru)
        news.sub_title_ru = updateNewsDto.sub_title_ru;
      if (updateNewsDto.sub_title_tm)
        news.sub_title_tm = updateNewsDto.sub_title_tm;
      if (image) news.image = image;
      return await this.newsRepo.update(id, news);
    } else {
      throw new NotFoundException('ID not found');
    }
  }

  async remove(id: number) {
    return await this.newsRepo.delete(id);
  }
}
