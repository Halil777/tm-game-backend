import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ClientType2 } from 'src/modules/client/entity/client.entity';

export class CreateKeyDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsIn([ClientType2.BASIC, ClientType2.ADVANCED, ClientType2.BUISNESS])
  @IsNotEmpty()
  client_type: string;
}
