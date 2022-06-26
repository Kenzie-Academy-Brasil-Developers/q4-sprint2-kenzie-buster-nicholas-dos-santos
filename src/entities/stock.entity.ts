import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column("int")
  quantity: number;

  @Column("numeric")
  price: number;
}
