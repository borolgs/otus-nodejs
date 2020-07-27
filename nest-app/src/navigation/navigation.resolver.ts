import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NavigatonService } from './navigation.service';
import { Navigation } from './navigation.model';
import { UpdateNavigation, CreateNavigation } from 'src/graphql';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Navigation')
@UseGuards(GqlJwtAuthGuard)
export class NavigationResolver {
  constructor(private readonly navigationService: NavigatonService) {}

  @Query('navigations')
  async findAll(): Promise<Navigation[]> {
    return this.navigationService.findAll();
  }

  @Query('navigation')
  async findOne(@Args('id') id: number): Promise<Navigation> {
    return this.navigationService.findOne(id);
  }

  @Mutation('updateNavigation')
  async update(
    @Args('id') id: number,
    @Args('data') data: UpdateNavigation,
  ): Promise<Navigation> {
    return this.navigationService.update(id, data);
  }

  @Mutation('createNavigation')
  async create(@Args('data') data: CreateNavigation): Promise<Navigation> {
    return this.navigationService.create(data);
  }
}
