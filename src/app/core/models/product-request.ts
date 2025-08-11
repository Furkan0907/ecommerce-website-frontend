export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  imageUrl?: string;
}
