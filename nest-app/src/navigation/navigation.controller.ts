import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { NavigatonService } from './navigation.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Navigation } from './navigation.model';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class NavigationController {
  constructor(private readonly navigationService: NavigatonService) {}

  @Get('api/v1/navigation')
  async get(): Promise<Navigation[]> {
    return this.navigationService.findAll();
  }

  @Get('api/v1/navigation/:id')
  async getOne(@Param('id', ParseIntPipe) id: string): Promise<Navigation> {
    return this.navigationService.finfOne(id);
  }

  @Post('api/v1/navigation/')
  async create(
    @Body() createNavigationDto: CreateNavigationDto,
  ): Promise<Navigation> {
    return this.navigationService.create(createNavigationDto);
  }

  @Patch('api/v1/navigation/:id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateNavigationDto: UpdateNavigationDto,
  ): Promise<Navigation> {
    return this.navigationService.update(id, updateNavigationDto);
  }
}
