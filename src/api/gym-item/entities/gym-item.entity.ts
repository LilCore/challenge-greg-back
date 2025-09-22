import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({ name: "gym_items" })
export class GymItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column({ type: "int" })
  price: number;

  @Column({ default: false })
  isFavorite: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;
}
