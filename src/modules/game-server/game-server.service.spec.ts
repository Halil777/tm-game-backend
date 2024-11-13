import { Test, TestingModule } from '@nestjs/testing';
import { GameServerService } from './game-server.service';

describe('GameServerService', () => {
  let service: GameServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameServerService],
    }).compile();

    service = module.get<GameServerService>(GameServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
