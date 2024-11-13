import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import GameEntity from './game.entity';

export enum AssetsType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Entity()
export default class GameAssets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: AssetsType,
    default: AssetsType.IMAGE,
  })
  type: AssetsType;

  @ManyToOne(() => GameEntity, (game) => game.assets, {
    onDelete: 'CASCADE',
  })
  game: GameEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
