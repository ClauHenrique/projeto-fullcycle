import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() 
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ){}

  create(createProductDto: CreateProductDto) {
    try {
      return this.productRepository.save(createProductDto);
    } catch (error) {
      console.log(error.message)
      
      throw new Error("Erro no servidor")
    }
  }

  findAll(): Promise<Product[]> {
    try {
      return this.productRepository.find();
    } catch (error) {
      console.log(error.message)
      
      throw new Error("Erro no servidor")
    }
  }

  findOne(id: string) {
    try {
      return this.productRepository.findOne({
        where: {
          id: id
        }
      })
    } catch (error) {
      console.log(error.message)
      
      throw new Error("Erro no servidor")
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return this.productRepository.update({id: id}, updateProductDto)
    } catch (error) {
      console.log(error.message)
      
      throw new Error("Erro no servidor")
    }
  }

  remove(id: string) {
    try {
      return this.productRepository.delete({id: id})
    } catch (error) {
      console.log(error.message)
      
      throw new Error("Erro no servidor")
    }
  }
}
