import { Address } from "./address.model";
import { DtoBase } from "./dto-base.model";
import { Payment } from "./payment.model";
import { Product } from "./product.model";


export interface Order extends DtoBase {
  address: Address;
  orderItems: OrderItem[];
  totalAmount: number;
  status: string;
  payment: Payment
}

export interface OrderRequest {
  addressId: number;
}

export interface OrderItem extends DtoBase {
  product: Product;
  quantity: number;
  price: number;
  status: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  orderId: number;
}
