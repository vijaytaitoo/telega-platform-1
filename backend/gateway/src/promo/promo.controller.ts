import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';

interface PromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  currency: string;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
}

@Controller('promo')
export class PromoController {
  private promoCodes: PromoCode[] = [
    {
      id: '1',
      code: 'SUMMER25',
      discount: 25,
      type: 'percentage',
      currency: 'KGS',
      minAmount: 1000,
      maxDiscount: 5000,
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
      expiresAt: new Date('2024-12-31'),
      createdAt: new Date(),
    },
    {
      id: '2',
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      currency: 'KGS',
      minAmount: 500,
      usageLimit: 50,
      usedCount: 0,
      isActive: true,
      expiresAt: new Date('2024-08-31'),
      createdAt: new Date(),
    },
  ];

  @Post()
  createPromo(@Body() promoData: Omit<PromoCode, 'id' | 'usedCount' | 'createdAt'>) {
    const newPromo: PromoCode = {
      ...promoData,
      id: Date.now().toString(),
      usedCount: 0,
      createdAt: new Date(),
    };
    this.promoCodes.push(newPromo);
    return { success: true, data: newPromo };
  }

  @Get()
  getAllPromos() {
    return { success: true, data: this.promoCodes };
  }

  @Get(':id')
  getPromoById(@Param('id') id: string) {
    const promo = this.promoCodes.find(p => p.id === id);
    if (!promo) {
      return { success: false, message: 'Promo code not found' };
    }
    return { success: true, data: promo };
  }

  @Get('validate/:code')
  validatePromo(@Param('code') code: string, @Query('amount') amount: string) {
    const promo = this.promoCodes.find(p => p.code === code && p.isActive);
    if (!promo) {
      return { success: false, message: 'Invalid promo code' };
    }

    const orderAmount = parseFloat(amount) || 0;
    if (promo.minAmount && orderAmount < promo.minAmount) {
      return { 
        success: false, 
        message: `Minimum order amount: ${promo.minAmount} ${promo.currency}` 
      };
    }

    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return { success: false, message: 'Promo code usage limit exceeded' };
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return { success: false, message: 'Promo code expired' };
    }

    const discount = promo.type === 'percentage' 
      ? (orderAmount * promo.discount / 100)
      : promo.discount;

    const finalDiscount = promo.maxDiscount 
      ? Math.min(discount, promo.maxDiscount)
      : discount;

    return {
      success: true,
      data: {
        ...promo,
        calculatedDiscount: finalDiscount,
        finalAmount: orderAmount - finalDiscount,
      },
    };
  }

  @Put(':id')
  updatePromo(@Param('id') id: string, @Body() updateData: Partial<PromoCode>) {
    const index = this.promoCodes.findIndex(p => p.id === id);
    if (index === -1) {
      return { success: false, message: 'Promo code not found' };
    }

    this.promoCodes[index] = { ...this.promoCodes[index], ...updateData };
    return { success: true, data: this.promoCodes[index] };
  }

  @Delete(':id')
  deletePromo(@Param('id') id: string) {
    const index = this.promoCodes.findIndex(p => p.id === id);
    if (index === -1) {
      return { success: false, message: 'Promo code not found' };
    }

    this.promoCodes.splice(index, 1);
    return { success: true, message: 'Promo code deleted' };
  }
} 