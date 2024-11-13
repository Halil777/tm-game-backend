import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameServer } from './entities/game-server.entity';
import { CreateGameServerDto } from './dto/create-game-server.dto';
import { UpdateGameServerDto } from './dto/update-game-server.dto';

@Injectable()
export class GameServerService {
  constructor(
    @InjectRepository(GameServer)
    private readonly gameServerRepository: Repository<GameServer>,
  ) {}

  findAll(): Promise<GameServer[]> {
    return this.gameServerRepository.find();
  }

  findOne(id: number): Promise<GameServer> {
    return this.gameServerRepository.findOneBy({ id });
  }

  async create(createGameServerDto: CreateGameServerDto): Promise<GameServer> {
    const gameServer = this.gameServerRepository.create(createGameServerDto);
    return this.gameServerRepository.save(gameServer);
  }

  async update(
    id: number,
    updateGameServerDto: UpdateGameServerDto,
  ): Promise<GameServer> {
    await this.gameServerRepository.update(id, updateGameServerDto);
    return this.gameServerRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.gameServerRepository.delete(id);
  }
}
