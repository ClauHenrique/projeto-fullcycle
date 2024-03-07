import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}


  create(createUserDto: CreateUserDto) {
    try {
      return this.userRepository.save(createUserDto);
    } catch (error) {
      console.log(error)
      
      throw new Error("Erro no servidor")
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(name: string, password: string): Promise<User | undefined> {
    try {
      return this.userRepository.findOne({
        where: {
          name: name,
          password: password
        }
      })
    } catch (error) {
      console.log(error.message)
      
      throw new Error("Erro no servidor")
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
