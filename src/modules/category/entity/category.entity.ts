import GameEntity from 'src/modules/game/entity/game.entity';
import ServerEntity from 'src/modules/server/entity/server.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_tm: string;

  @Column()
  name_ru: string;

  @Column()
  name_en: string;

  @Column()
  desc_tm: string;

  @Column()
  desc_en: string;

  @Column()
  desc_ru: string;

  @Column()
  image: string;

  @OneToMany(() => ServerEntity, (server) => server.category, {
    onDelete: 'CASCADE',
  })
  server?: ServerEntity[];

  @OneToMany(() => GameEntity, (game) => game.category, {
    onDelete: 'RESTRICT',
  })
  game?: GameEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
