import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ShortenedUrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  prefix: string;

  @Column({ nullable: false })
  originalUrl: string;

  @Column({ nullable: false })
  accessCounter: number;

  @Column({ nullable: false })
  shortenedCounter: number;

  @ManyToOne(() => UserEntity, (user) => user.shortenedUrls)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
