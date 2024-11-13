import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ServerLocation, ServerType } from '../entity/server.entity';

export default class CreateServerDto {
  @IsString()
  @IsNotEmpty()
  server_name: string;

  @IsNumber()
  @IsNotEmpty()
  server_port: number;

  @IsString()
  @IsNotEmpty()
  server_host: string;

  @IsString()
  @IsNotEmpty()
  server_username: string;

  @IsString()
  @IsNotEmpty()
  server_password: string;

  @IsString()
  @IsNotEmpty()
  display_host: string;

  @IsString()
  @IsNotEmpty()
  display_port: string;

  @IsNumber()
  @IsNotEmpty()
  speed: number;

  categoryId: number;

  @IsString()
  @IsIn([ServerType.BASIC, ServerType.ADVANCED, ServerType.BUISNESS])
  type: ServerType;

  @IsIn([ServerLocation.LOCAL, ServerLocation.GLOBAl])
  location: ServerLocation;
}
