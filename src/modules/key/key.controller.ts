import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { KeyService } from './key.service';
import { CreateKeyDto } from './dto/create-key.dto';
import UserGuard from '../user/user.guard';

@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll() {
    return this.keyService.findAll();
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  remove(@Param('id') id: string) {
    return this.keyService.remove(+id);
  }
}
