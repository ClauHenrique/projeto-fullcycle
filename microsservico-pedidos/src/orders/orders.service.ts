import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>
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

    return await this.orderRepository.save(order)

   } catch (error) {
    console.log(error);
    
    throw new Error("erro no servidor")
   }
  }

  findAll(): Promise<Order[]> {
    try {
      return this.orderRepository.find();
    } catch (error) {
      console.log(error);
      throw new Error("erro no servidor: ")
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

}
