export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentProvider {
  BAZU = 'bazu',
  TELEGRAM = 'telegram',
}

export interface PaymentDetails {
  orderId: string;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  id: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  providerPaymentId?: string;
  amount: number;
  currency: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentProvider {
  createPayment(details: PaymentDetails): Promise<PaymentResult>;
  processWebhook(payload: any): Promise<PaymentResult>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
  refundPayment(paymentId: string): Promise<PaymentResult>;
}
