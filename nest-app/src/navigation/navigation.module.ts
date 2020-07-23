import { Module } from '@nestjs/common';
import { NavigatonService } from './navigation.service';
import { NavigationController } from './navigation.controller';

@Module({
  controllers: [NavigationController],
  providers: [NavigatonService],
})
export class NavigationModule {}
