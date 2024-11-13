import { IsString, IsNotEmpty, IsIP, IsNumber } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateGameServerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIP()
  @IsNotEmpty()
  ipAddress: string;

  @IsNumber()
  @IsNotEmpty()
  port: number;

  @IsString()
  @IsNotEmpty()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
