import { DtoBase } from "./dto-base.model";
import { User } from "./user.model";


export interface Product extends DtoBase {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  imageUrl?: string;
  seller: User;
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  imageUrl?: string;
  sellerId: number;
}
