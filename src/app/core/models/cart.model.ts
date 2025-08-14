import { DtoBase } from "./dto-base.model";
import { Product } from "./product.model";

export interface CartItem extends DtoBase {
  product: Product;
  quantity: number;
}

export interface Cart extends DtoBase {
  cartItems: CartItem[];
}

export interface CartItemRequest {
  productId: number;
  cartId: number;
  quantity: number;
}
