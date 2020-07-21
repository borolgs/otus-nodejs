import { IsString } from 'class-validator';

export class CreateNavigationDto {
  @IsString()
  name: string;
  @IsString()
  url: string;
  icon?: string;
}
