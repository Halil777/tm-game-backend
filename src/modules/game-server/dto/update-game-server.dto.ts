import { PartialType } from '@nestjs/swagger';
import { CreateGameServerDto } from './create-game-server.dto';

export class UpdateGameServerDto extends PartialType(CreateGameServerDto) {}
