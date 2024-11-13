import PaymantHistoryEntity from 'src/modules/paymant-history/entity/payment-history.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ClientType {
  NONE = 'NONE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  BUISNESS = 'BUISNESS',
}

@Entity()
export default class PricingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_tm: string;

  @Column()
  title_en: string;

  @Column()
  title_ru: string;

  @Column()
  desc_tm: string;

  @Column()
  desc_en: string;

  @Column()
  desc_ru: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ClientType,
    default: ClientType.BASIC,
  })
  clientType: ClientType;

  @OneToMany(() => PaymantHistoryEntity, (payment) => payment.pricing)
  payment: PaymantHistoryEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
