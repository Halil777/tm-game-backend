import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ServerEntity, { ServerLocation } from './entity/server.entity';
import { Repository } from 'typeorm';
import CategoryEntity from '../category/entity/category.entity';
import CreateServerDto from './dto/create-server.dto';
import CreateGameServerDto from './dto/create-game-server.dto';
import GameEntity from '../game/entity/game.entity';
import UpdateServerDto from './dto/update-server.dto';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private readonly serverRepo: Repository<ServerEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(GameEntity)
    private readonly gameRepo: Repository<GameEntity>,
  ) {}

  async addServer(body: CreateServerDto) {
    try {
      const server = new ServerEntity();
      server.display_host = body.display_host;
      server.display_port = body.display_port;
      server.server_host = body.server_host;
      server.server_name = body.server_name;
      server.server_password = body.server_password;
      server.server_port = body.server_port;
      server.server_username = body.server_username;
      server.speed = body.speed;
      server.type = body.type;
      server.location = body.location;
      if (body.categoryId) {
        server.category = await this.categoryRepo.findOne({
          where: {
            id: body.categoryId,
          },
        });
      }
      return await this.serverRepo.save(server);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateServer(id: number, body: UpdateServerDto) {
    try {
      const server = await this.serverRepo.findOneBy({ id: id });
      if (body.display_host) server.display_host = body.display_host;
      if (body.display_port) server.display_port = body.display_port;
      if (body.server_host) server.server_host = body.server_host;
      if (body.server_name) server.server_name = body.server_name;
      if (body.server_password) server.server_password = body.server_password;
      if (body.server_port) server.server_port = body.server_port;
      if (body.server_username) server.server_username = body.server_username;
      if (body.speed) server.speed = body.speed;
      if (body.type) server.type = body.type;
      if (body.location) server.location = body.location;
      if (body.categoryId) {
        server.category = await this.categoryRepo.findOne({
          where: {
            id: body.categoryId,
          },
        });
      }
      return await this.serverRepo.update(id, server);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async addServerToGame(body: CreateGameServerDto) {
    try {
      const server = await this.serverRepo.findOne({
        where: {
          id: body.serverId,
        },
        select: {
          game: true,
        },
        loadEagerRelations: true,
        relations: {
          game: true,
        },
      });
      console.log(server.game);
      const games: GameEntity[] = server.game;

      games.push(await this.gameRepo.findOneBy({ id: body.gameId }));
      server.game = games;
      return await this.serverRepo.save(server);
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async deleteServerFromGame(body: CreateGameServerDto) {
    try {
      const server = await this.serverRepo.findOne({
        where: {
          id: body.serverId,
        },
        select: {
          game: true,
        },
        loadEagerRelations: true,
        relations: {
          game: true,
        },
      });
      console.log(server.game);
      let games: GameEntity[] = server.game;
      if (games) {
        games = games.filter((v) => v.id != body.gameId);
      }
      server.game = games;
      return await this.serverRepo.save(server);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteServer(id: number) {
    try {
      return await this.serverRepo.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getServers(location: ServerLocation | undefined) {
    return await this.serverRepo.find({
      where: {
        location: location,
      },
      order: {
        created_at: 'DESC',
      },
      select: {
        game: true,
      },
      loadRelationIds: true,
    });
  }
}
