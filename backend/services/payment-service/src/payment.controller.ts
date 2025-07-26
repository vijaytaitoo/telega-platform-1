import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payment } from '@telega/database';
import { PaymentService } from './payment.service';
import {
  PaymentDetails,
  PaymentProvider,
} from './interfaces/payment.interface';

@Controller('payments')
@UseGuards(AuthGuard('jwt'))
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(
    @Body() data: { provider: PaymentProvider; details: PaymentDetails },
  ): Promise<Payment> {
    return this.paymentService.createPayment(data.provider, data.details);
  }

  @Post('webhook/:provider')
  async handleWebhook(
    @Param('provider') provider: PaymentProvider,
    @Body() payload: any,
  ): Promise<Payment> {
    return this.paymentService.processWebhook(provider, payload);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.getPaymentById(id);
  }

  @Get('order/:orderId')
  async getPaymentsByOrder(
    @Param('orderId') orderId: string,
  ): Promise<Payment[]> {
    return this.paymentService.getPaymentsByOrderId(orderId);
  }

  @Post(':id/refund')
  async refundPayment(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.refundPayment(id);
  }
}
