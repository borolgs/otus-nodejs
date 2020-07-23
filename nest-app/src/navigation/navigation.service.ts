import { Injectable, NotFoundException } from '@nestjs/common';
import { Navigation } from './navigation.interface';
import * as navigations from '../__mocks__/navigations.json';

@Injectable()
export class NavigatonService {
  private readonly navigations: Navigation[] = navigations;

  get(): Navigation[] {
    return this.navigations;
  }

  getOne(id: string): Navigation {
    const nav = this.navigations.find(n => n.id == id);
    if (!nav) {
      throw new NotFoundException();
    }
    return nav;
  }
}
