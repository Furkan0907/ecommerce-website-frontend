import { Address } from "./address.model";
import { DtoBase } from "./dto-base.model";
import { Payment } from "./payment.model";
import { Product } from "./product.model";
import { User } from "./user.model";


export interface Order extends DtoBase {
  user?: User
  address: Address;
  orderItems: OrderItem[];
  totalAmount: number;
  status: string;
  payment: Payment
}

export interface OrderRequest {
  userId?: number;
  addressId: number;
}

export interface OrderItem extends DtoBase {
  product: Product;
  quantity: number;
  price: number;
  status: string;
  orderId: number;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  orderId: number;
}
