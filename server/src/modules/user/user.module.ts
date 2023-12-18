import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repostitories/user.repository';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  controllers: [],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
