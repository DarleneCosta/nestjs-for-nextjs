//import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  //JoinColumn,
  //ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Post {
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

  /*@ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;*/
}
