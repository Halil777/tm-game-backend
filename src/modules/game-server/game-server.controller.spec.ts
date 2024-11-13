import { Test, TestingModule } from '@nestjs/testing';
import { GameServerController } from './game-server.controller';
import { GameServerService } from './game-server.service';

describe('GameServerController', () => {
  let controller: GameServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameServerController],
      providers: [GameServerService],
    }).compile();

    controller = module.get<GameServerController>(GameServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
