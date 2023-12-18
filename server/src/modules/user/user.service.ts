import { UserRepository } from './repostitories/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findOneByName(name: string): Promise<User> {
    return this.userRepository.findOneByName(name);
  }

  remove(id: number): Promise<User> {
    return this.userRepository.remove(id);
  }
}
