import { Injectable, NotFoundException } from '@nestjs/common';
import * as navigations from '../__mocks__/navigations.json';
import { InjectModel } from '@nestjs/sequelize';
import { Navigation } from './navigation.model';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';

@Injectable()
export class NavigatonService {
  constructor(
    @InjectModel(Navigation) private navigationModel: typeof Navigation,
  ) {}

  async findAll(): Promise<Navigation[]> {
    return this.navigationModel.findAll();
  }

  async finfOne(id: string): Promise<Navigation> {
    return this.navigationModel.findOne({ where: { id } });
  }

  async create(navigationDto: CreateNavigationDto): Promise<Navigation> {
    return this.navigationModel.create(navigationDto);
  }

  async update(id: string, navigationDto: UpdateNavigationDto): Promise<any> {
    return this.navigationModel.update(navigationDto, { where: { id } });
  }
}
