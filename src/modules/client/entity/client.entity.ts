import PaymantHistoryEntity from 'src/modules/paymant-history/entity/payment-history.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ClientType2 {
  NONE = 'NONE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  BUISNESS = 'BUISNESS',
}

@Entity()
export default class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  stream_id: string;

  @Column({
    default: false,
  })
  deleted: boolean;

  @OneToMany(() => PaymantHistoryEntity, (payment) => payment.client)
  payment?: PaymantHistoryEntity[];

  @Column({
    type: 'enum',
    enum: ClientType2,
    default: ClientType2.NONE,
  })
  clientType?: ClientType2;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
