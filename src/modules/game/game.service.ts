import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import GameEntity from './entity/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import GameAssets, { AssetsType } from './entity/game-assets.entity';
import CreateGameDto from './dto/create-game.dto';
import CategoryEntity from '../category/entity/category.entity';
import UpdateGameDto from './dto/update-game.dto';
import GetGamesDto, { SORT_BY_DATE_DESC } from './dto/get-games.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepo: Repository<GameEntity>,
    @InjectRepository(GameAssets)
    private readonly gameAssetRepo: Repository<GameAssets>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async addGame(body: CreateGameDto): Promise<GameEntity> {
    try {
      const game = new GameEntity();
      game.desc_en = body.desc_en;
      game.desc_ru = body.desc_ru;
      game.desc_tm = body.desc_tm;
      game.title_en = body.title_en;
      game.title_ru = body.title_ru;
      game.title_tm = body.title_tm;
      game.location = body.location;
      game.site_url = body.site_url;
      game.star = body.star;
      game.steam_id = body.steam_id;
      const result = await this.gameRepo.save(game);
      return result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async addGameAssets(
    url: string,
    type: AssetsType,
    id: number,
  ): Promise<GameAssets> {
    try {
      const asset = new GameAssets();
      asset.url = url;
      asset.type = type;
      const game = await this.gameRepo.findOne({
        where: {
          id: id,
        },
      });
      asset.game = game;
      return await this.gameAssetRepo.save(asset);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteGameAssets(id: number) {
    try {
      return await this.gameAssetRepo.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateGame(id: number, body: UpdateGameDto) {
    try {
      const game = await this.gameRepo.findOne({ where: { id: id } });
      if (body.desc_en) game.desc_en = body.desc_en;
      if (body.desc_ru) game.desc_ru = body.desc_ru;
      if (body.desc_tm) game.desc_tm = body.desc_tm;
      if (body.title_en) game.title_en = body.title_en;
      if (body.title_ru) game.title_ru = body.title_ru;
      if (body.title_tm) game.title_tm = body.title_tm;
      if (body.site_url) game.site_url = body.site_url;
      if (body.star) game.star = body.star;
      if (body.steam_id) game.steam_id = body.steam_id;
      if (body.location) game.location = body.location;
      await this.gameRepo.update(id, game);
      return game;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteGame(id: number) {
    try {
      return await this.gameRepo.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getGames(body: GetGamesDto) {
    try {
      let where: any = {};

      if (body.categoryId) {
        where = {
          ...where,
          category: {
            id: body.categoryId,
          },
        };
      }

      if (body.location) {
        where = {
          ...where,
          location: body.location,
        };
      }

      let size = 20;
      if (body.size) size = body.size;

      const result = await this.gameRepo.findAndCount({
        take: size,
        skip: size * (body.page - 1),
        where: where,
        order: {
          created_at: body.sort === SORT_BY_DATE_DESC ? 'DESC' : 'ASC',
        },
        relations: {
          assets: true,
          category: true,
          server: true,
        },
        loadEagerRelations: true,
        select: {
          server: true,
          assets: true,
          category: {
            id: true,
            name_en: true,
            name_ru: true,
            name_tm: true,
          },
        },
      });
      // 102 20 102/20
      return {
        total: result[1],
        pages: Math.ceil(result[1] / size),
        games: result[0],
      };
    } catch (err) {
      throw new BadRequestException(body);
    }
  }

  async getById(id: number) {
    try {
      return await this.gameRepo.findOne({
        where: {
          id: id,
        },
        relations: {
          server: true,
          assets: true,
          category: true,
        },
        loadEagerRelations: true,
        select: {
          server: true,
          assets: true,
          category: {
            name_en: true,
            name_ru: true,
            name_tm: true,
            desc_en: true,
            desc_ru: true,
            desc_tm: true,
            image: true,
            id: true,
            server: true,
          },
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
