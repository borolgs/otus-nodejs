import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('api/v1/users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
