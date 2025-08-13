import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ default: false })
  published: boolean;

  @Column({ nullable: true })
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users)
  author: Users;
}
