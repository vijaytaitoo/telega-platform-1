import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class TelegramAuthDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  hash: string;

  @IsNotEmpty()
  @IsNumber()
  auth_date: number;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  photo_url?: string;
}
