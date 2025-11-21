import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])   // 👈 REQUIRED
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
