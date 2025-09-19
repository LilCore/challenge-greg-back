import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
