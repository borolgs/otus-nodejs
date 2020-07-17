import { Module } from '@nestjs/common';
import { NavigationModule } from './navigation/navigation.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({ load: [config] }), NavigationModule],
})
export class AppModule {}
