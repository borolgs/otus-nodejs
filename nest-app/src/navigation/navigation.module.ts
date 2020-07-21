import { Module } from '@nestjs/common';
import { NavigatonService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Navigation } from './navigation.model';

@Module({
  imports: [SequelizeModule.forFeature([Navigation])],
  controllers: [NavigationController],
  providers: [NavigatonService],
})
export class NavigationModule {}
