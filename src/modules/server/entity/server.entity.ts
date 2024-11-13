import CategoryEntity from 'src/modules/category/entity/category.entity';
import GameEntity from 'src/modules/game/entity/game.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ServerType {
  NONE = 'NONE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  BUISNESS = 'BUISNESS',
}

export enum ServerLocation {
  LOCAL = 'LOCAL',
  GLOBAl = 'GLOBAL',
}

@Entity()
export default class ServerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  server_name: string;

  @Column()
  server_port: number;

  @Column()
  server_host: string;

  @Column()
  server_username: string;

  @Column()
  server_password: string;

  @Column()
  display_host: string;

  @Column()
  display_port: string;

  @Column()
  speed: number;

  @Column({
    type: 'enum',
    enum: ServerType,
    default: ServerType.BASIC,
  })
  type: ServerType;

  @ManyToOne(() => CategoryEntity, (category) => category.server)
  category?: CategoryEntity;

  @ManyToMany(() => GameEntity, (game) => game.server)
  @JoinTable()
  game?: GameEntity[];

  @Column({
    type: 'enum',
    enum: ServerLocation,
    default: ServerLocation.LOCAL,
  })
  location: ServerLocation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
