import { UserRepository } from './repostitories/user.repository';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: Prisma.UserCreateInput): Promise<User> {
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

  async findOneById(id: number): Promise<Omit<User, 'password'>> {
    return await this.userRepository.findOneById(id);
  }

  remove(id: number): Promise<User> {
    return this.userRepository.remove(id);
  }
}
