import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { Repository } from 'typeorm';
import { Key } from './entities/key.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(Key)
    private readonly keyRepo: Repository<Key>,
  ) {}
  async create(createKeyDto: CreateKeyDto) {
    const key = await this.keyRepo.findOneBy({
      key: createKeyDto.key,
    });
    if (key) {
      throw new ForbiddenException('Key already exist');
    } else {
      return await this.keyRepo.insert({
        key: createKeyDto.key,
        client_type: createKeyDto.client_type,
      });
    }
  }

  async findAll() {
    return await this.keyRepo.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async remove(id: number) {
    try {
      await this.keyRepo.delete(id);
      return {
        success: true,
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
