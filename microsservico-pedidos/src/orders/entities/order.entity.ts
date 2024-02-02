import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order.item.entity";

export enum OrderSatus {
    PENDIND = 'pendind',
    PAID = 'paid',
    FAILED = 'failed'
}

export type CreateOrderCommand = {
    client_id: number;
    items: {
      product_id: string;
      quantity: number;
      price: number;
    }[];
  };


@Entity('order')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    total: number;

    @Column()
    cliente_id: number

    @Column()
    status: OrderSatus = OrderSatus.PENDIND

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => OrderItem, (item) => item.order, {cascade: ['insert'], eager: true})
    items: OrderItem[]

    static create(input: CreateOrderCommand) {
        // metodo para preencher as colunas com valores tratados dentro da propia entidade

        const order = new Order()
        order.cliente_id = input.client_id

        // adicionar items de compra com objetos do tipo orderItem
        order.items = input.items.map((item) => {
            const orderItem = new OrderItem()
            orderItem.product_id = item.product_id
            orderItem.quantity = item.quantity
            orderItem.price = item.price
            return orderItem
        })
        
        // calcular o total de compra
        order.total = input.items.reduce((sum, elem) => {            
            
            return sum + elem.price * elem.quantity
            
        }, 0)
        return order

    }
}
