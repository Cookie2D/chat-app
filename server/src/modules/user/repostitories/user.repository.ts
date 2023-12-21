import { PrismaService } from './../../../core/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Roles } from 'src/const/roles/roles';
import { getRandomColor } from 'src/utils/getRandomColor';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const userCount = await this.prismaService.user.count();
    const role = userCount === 0 ? Roles.ADMIN : Roles.USER;

    return await this.prismaService.user.create({
      data: {
        ...data,
        color: getRandomColor(),
        role: {
          connect: {
            name: role,
          },
        },
      },
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        color: true,
        muted: true,
        banned: true,
      },
    });
  }

  async updateOne(id: number, user: Prisma.UserUpdateInput): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async findOneByName(name: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        name,
      },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
