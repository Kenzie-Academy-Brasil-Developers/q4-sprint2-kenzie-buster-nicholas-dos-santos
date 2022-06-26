import { compare } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cart } from "./cart.entity";

@Entity("user")
export class User {
  /* 
    Ao utilizar o decorator PrimariGeneratedColumn já é gerada automaticamente
    de acordo com o datatype passado.
  */

  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAdm: boolean;

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };

  @OneToMany(() => Cart, (cart) => cart.newUser)
  cart: Cart[];
}
