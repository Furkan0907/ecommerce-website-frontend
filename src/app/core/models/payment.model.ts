import { DtoBase } from "./dto-base.model";

export interface Payment extends DtoBase {
  orderId: number;
  amount: number;
  method: string;
  transactionId?: string;
  status: string;
}

export interface PaymentIU {
  orderId: number;
  method: string;
  transactionId?: string;
}
