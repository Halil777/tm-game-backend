import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateGameServerDto {
  @IsNotEmpty()
  @IsNumber()
  gameId: number;

  @IsNotEmpty()
  @IsNumber()
  serverId: number;
}
