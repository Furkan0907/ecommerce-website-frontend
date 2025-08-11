import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

export interface CartItemResponse {
  id: number;
  product: {
    id: number;
    name: string;
    price: string;
    description?: string;
    stockQuantity: number;
    category: string;
    brand: string;
    imageUrl?: string;
  };
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl + '/carts';

  constructor(private http: HttpClient) { }

  addItemToCart(userId: number, productId: number, quantity: number = 1): Observable<CartItemResponse> {
    const params = new HttpParams()
    .set('productId', productId.toString())
    .set('quantity', quantity.toString());

    return this.http.post<ApiResponse<CartItemResponse>>(`${this.apiUrl}/${userId}/items`,
      null,
      { params }
    ).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error(response.error || 'Can not add to cart');
        }
      })
    );
  }

  getCartByUserId(userId: number): Observable<{ cartItems: CartItemResponse[] }> {
    return this.http.get<{ cartItems: CartItemResponse[] }>(`${this.apiUrl}/by-user-id/${userId}`);
  }
}
