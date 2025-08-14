import { DtoBase } from "./dto-base.model";
import { Product } from "./product.model";
import { User } from "./user.model";

export interface Review extends DtoBase {
  user: User;
  product: Product;
  content: string;
  raiting: number;
}

export interface ReviewRequest {
  productId: number;
  userId?: number;
  content: string;
  raiting: number;
}
