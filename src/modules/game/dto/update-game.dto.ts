import { PartialType } from '@nestjs/swagger';
import CreateGameDto from './create-game.dto';

export default class UpdateGameDto extends PartialType(CreateGameDto) {}
