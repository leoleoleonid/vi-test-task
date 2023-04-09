import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ShortenedUrlEntity } from './shortenedUrl.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => ShortenedUrlEntity, (shortenedUrl) => shortenedUrl.user)
  shortenedUrls: ShortenedUrlEntity[];
}
