import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Dvd } from "./dvd.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column("float")
  total: number;

  // Relacionamento Many to One com usuário compra de um usuário
  @ManyToOne(() => User, (user) => user.cart, {
    eager: true,
  })
  newUser: User;

  // Relacionamento Many to One para dvds - Compra um dvd por vez
  @ManyToOne(() => Dvd, (dvd) => dvd.cart, {
    eager: true,
  })
  dvd: Dvd;
}
