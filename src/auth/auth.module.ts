import { UserRepository } from './users.repository';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
