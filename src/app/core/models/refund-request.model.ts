import { DtoBase } from "./dto-base.model";
import { Order } from "./order.model";

export interface RefundRequest extends DtoBase {
  order: Order;
  reason: string;
  status: string;
}

export interface RefundRequestRequest {
  orderId: string;
  reason: string;
}
