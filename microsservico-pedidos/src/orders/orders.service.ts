import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';


@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private amqpConnection: AmqpConnection
  ){}


  async create(createOrderDto: CreateOrderDto) {
   try {
    

    // pegar os ids dos produtos
    const productIds = createOrderDto.items.map((item) => item.product_id)
    

    // filtro - remover ids duplicados
    const idUnico = [...new Set(productIds)]

    // pegar esses produtos no banco
    const products = await this.productRepository.findBy({
      id: In(idUnico)
    })

    
    if (products.length !== idUnico.length) {
      throw new Error(
        `Produtos com ids: ${productIds}, nao encontrados`,
      );
    }
    
    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const prod = products.find((product) => product.id === item.product_id)

        return {
          price: prod.price,
          product_id: item.product_id,
          quantity: item.quantity
        }
      })
    })

    await this.orderRepository.save(order)

    // publicar mensagem
    // definir o nome da exchange "amq.direct" e a chave de roteamento "orderCreated"
    await this.amqpConnection.publish('amq.direct', 'orderCreated', {
        order_id: order.id,
        card_hash: createOrderDto.card_hash,
        total: order.total
    })

    return order

   } catch (error) {
    console.log(error);
    
    throw new Error("erro no servidor")
   }
  }

  findAll(client_id: number): Promise<Order[]> {
    try {
      return this.orderRepository.find({
        where: {
          cliente_id: client_id
        },
        order: {
          created_at: 'DESC'
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error("erro no servidor: ")
    }
  }

  findOne(id: string, cliente_id: number): Promise<Order | undefined> {

      return this.orderRepository.findOneByOrFail({
        id,
        cliente_id
    })
  }

}
