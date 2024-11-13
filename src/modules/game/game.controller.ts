import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GameService } from './game.service';
import CreateGameDto from './dto/create-game.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsType } from './entity/game-assets.entity';
import UpdateGameDto from './dto/update-game.dto';
import GetGamesDto from './dto/get-games.dto';
import UserGuard from '../user/user.guard';
import ClientGuard from '../user/client.guard';
import { diskStorage } from 'multer';
import { editFileName } from '../category/category.controller';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('add-game')
  @UseGuards(UserGuard)
  addGame(@Body() body: CreateGameDto) {
    return this.gameService.addGame(body);
  }

  @Put('add-game-video/:id')
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/game/video',
        filename: editFileName,
      }),
    }),
  )
  addGameVideo(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.gameService.addGameAssets(file.path, AssetsType.VIDEO, +id);
  }

  @Put('add-game-image/:id')
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload/game/image',
        filename: editFileName,
      }),
    }),
  )
  addGameImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.gameService.addGameAssets(file.path, AssetsType.IMAGE, +id);
  }

  @Delete('delete-game-assets/:id')
  @UseGuards(UserGuard)
  deleteGameAsset(@Param('id') id: string) {
    return this.gameService.deleteGameAssets(+id);
  }

  @Patch('update-game/:id')
  @UseGuards(UserGuard)
  updateGame(@Param('id') id: string, @Body() body: UpdateGameDto) {
    return this.gameService.updateGame(+id, body);
  }

  @Delete('delete-game/:id')
  @UseGuards(UserGuard)
  deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(+id);
  }

  @Post('admin/get-games')
  @UseGuards(UserGuard)
  getGamesAdmin(@Body() body: GetGamesDto) {
    return this.gameService.getGames(body);
  }

  @Post('get-games')
  @UseGuards(ClientGuard)
  getGames(@Body() body: GetGamesDto) {
    return this.gameService.getGames(body);
  }

  @Get('get-game-by-id/:id')
  @UseGuards(ClientGuard)
  getById(@Param('id') id: string) {
    return this.gameService.getById(+id);
  }

  @Get('admin/get-game-by-id/:id')
  @UseGuards(UserGuard)
  getByIdAdmin(@Param('id') id: string) {
    return this.gameService.getById(+id);
  }
}
