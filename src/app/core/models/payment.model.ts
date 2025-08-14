import { DtoBase } from "./dto-base.model";

export interface Payment extends DtoBase {
  orderId: number;
  amount: number;
  paymentMethod: number;
  transactionId?: string;
  paymentStatus: string;
}

export interface PaymentRequest {
  orderId: number;
  paymentMethod: string;
  transactionId?: string;
}
