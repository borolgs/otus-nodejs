import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NavigatonService } from './navigation.service';
import { Navigation } from './navigation.interface';
import { Auth } from '../auth/auth.decorator';

@Controller()
@Auth()
export class NavigationController {
  constructor(private readonly navigationService: NavigatonService) {}

  @Get()
  async get(): Promise<Navigation[]> {
    return this.navigationService.get();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string): Promise<Navigation> {
    return this.navigationService.getOne(id);
  }
}
