import { DtoBase } from "./dto-base.model";


export interface Product extends DtoBase {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  imageUrl?: string;
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  imageUrl?: string;
}
