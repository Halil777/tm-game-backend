import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_tm: string;

  @Column()
  title_ru: string;

  @Column()
  title_en: string;

  @Column()
  sub_title_tm: string;

  @Column()
  sub_title_en: string;

  @Column()
  sub_title_ru: string;

  @Column()
  desc_tm: string;

  @Column()
  desc_ru: string;

  @Column()
  desc_en: string;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
