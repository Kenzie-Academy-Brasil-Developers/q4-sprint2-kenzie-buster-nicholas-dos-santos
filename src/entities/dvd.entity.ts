import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Stock } from "./stock.entity";

@Entity()
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  duration: string;

  /* - Relacionamento OneToOne
    O decorator @OneToOne deve ser setado do lado que recebe a relação,
    ou melhor dizendo, o lado que recebe a Foreign Key. Ao habilitar
    eager todas as propriedades serão carregadas automaticamente, não necessitando
    especificar a relação. Aqui, crio uma relação unilateral, pois não irei
    criar uma rota para stock. Utilizar QueryBuilder iria desabilitar o eager loading
    
    Caso fosse interessante, poderia criar uma relação bilateral, 
    onde o JoinColumn permaneceria no lado da FK, mas permitiria
    o uso de QueryBuilder .leftJoinAndSelect("stock","dvd") 
  */
  @OneToOne((type: Stock) => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;

  @OneToMany(() => Cart, (cart) => cart.dvd)
  cart: Cart[];
}
