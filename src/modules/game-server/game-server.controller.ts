import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GameServerService } from './game-server.service';
import { CreateGameServerDto } from './dto/create-game-server.dto';
import { UpdateGameServerDto } from './dto/update-game-server.dto';
import UserGuard from '../user/user.guard';

@Controller('game-servers')
export class GameServerController {
  constructor(private readonly gameServerService: GameServerService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createGameServerDto: CreateGameServerDto) {
    return this.gameServerService.create(createGameServerDto);
  }

  @Get()
  findAll() {
    return this.gameServerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gameServerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  update(
    @Param('id') id: number,
    @Body() updateGameServerDto: UpdateGameServerDto,
  ) {
    return this.gameServerService.update(id, updateGameServerDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  remove(@Param('id') id: number) {
    return this.gameServerService.remove(id);
  }
}
