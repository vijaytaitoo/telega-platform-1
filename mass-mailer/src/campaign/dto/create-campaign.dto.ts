import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  ownerId: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  buttons?: any;

  @IsArray()
  @IsString({ each: true })
  recipients: string[];
} 