import { DtoBase } from "./dto-base.model";
import { Order, OrderItem } from "./order.model";

export interface RefundRequest extends DtoBase {
  order: Order;
  orderItem: OrderItem;
  reason: string;
  status: string;
}

export interface RefundRequestRequest {
  orderItemId: number;
  reason: string;
}
