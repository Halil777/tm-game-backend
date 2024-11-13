import { PartialType } from '@nestjs/swagger';
import CreateServerDto from './create-server.dto';

export default class UpdateServerDto extends PartialType(CreateServerDto) {}
