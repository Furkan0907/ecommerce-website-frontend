export interface ProductResponse {
  status: number;
  payload: Product;
  error?: string;
}

export interface AllProductResponse {
  status: number;
  payload: Product[];
  error?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  imageUrl?: string;
}
