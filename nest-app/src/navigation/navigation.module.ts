import { Module } from '@nestjs/common';
import { NavigatonService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Navigation } from './navigation.model';
import { NavigationResolver } from './navigation.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Navigation])],
  controllers: [NavigationController],
  providers: [NavigatonService, NavigationResolver],
})
export class NavigationModule {}
