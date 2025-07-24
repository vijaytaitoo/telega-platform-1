import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from '../services/shops.service';
import { SupabaseModule } from '../services/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}