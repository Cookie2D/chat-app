import { UserRepository } from './repostitories/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { excludeFromObject } from 'src/utils/exclude';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  updateOne(userId: number, user: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.updateOne(userId, user);
  }

  findAll(): Promise<Partial<User>[]> {
    return this.userRepository.findAll();
  }

  findOneByName(name: string): Promise<User> {
    return this.userRepository.findOneByName(name);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);

    return excludeFromObject(user, 'password');
  }

  remove(id: number): Promise<User> {
    return this.userRepository.remove(id);
  }
}
