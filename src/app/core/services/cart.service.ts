import { AuthService } from './../../authentication/service/auth.service';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";

export interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    description?: string;
    stockQuantity: number;
    category: string;
    brand: string;
    imageUrl?: string;
  };
  quantity: number;
}

export interface Cart {
  id: number,
  cartItems: CartItem[]
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl + '/carts';

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadCartItemCount();
  }

  loadCartItemCount() {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      this.cartItemCountSubject.next(0);
      return;
    }
    this.http.get<ApiResponse<CartItem[]>>(`/api/carts/${userId}/items`).subscribe({
      next: (response) => {
        const count = response.payload.reduce((acc, item) => acc + item.quantity, 0);
        this.cartItemCountSubject.next(count);
      },
      error: () => this.cartItemCountSubject.next(0)
    });
  }

  updateCartItemCount(newCount: number) {
    this.cartItemCountSubject.next(newCount);
  }

  addItemToCart(userId: number, productId: number, quantity: number = 1): Observable<CartItem> {
    const params = new HttpParams()
    .set('productId', productId.toString())
    .set('quantity', quantity.toString());

    return this.http.post<ApiResponse<CartItem>>(`${this.apiUrl}/${userId}/items`,
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

  getCartByUserId(userId: number): Observable<{ cartItems: CartItem[] }> {
    return this.http.get<{ cartItems: CartItem[] }>(`${this.apiUrl}/by-user-id/${userId}`);
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<ApiResponse<CartItem[]>>(`${this.apiUrl}/${userId}/items`).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error(response.error || 'Cart item has not get')
        }
      })
    );
  }

  updateItemQuantity(userId: number, productId: number, quantity: number): Observable<CartItem> {
    const params = new HttpParams()
    .set('productId', productId.toString())
    .set('quantity', quantity.toString());

    return this.http.put<ApiResponse<CartItem>>(`${this.apiUrl}/${userId}/items`, null, { params }).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error(response.error || 'Product quantity updated');
        }
      })
    );
  }

  removeItemFromCart(userId: number, productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId.toString());

    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${userId}/items`, { params }).pipe(
      map(response => {
        if (response.status === 200) {
          return;
        } else {
          throw new Error(response.error || 'Product could not been removed from the cart');
        }
      })
    );
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${userId}/clear`).pipe(
      map(response => {
        if (response.status === 200) {
          return;
        } else {
          throw new Error(response.error || 'Cart could not cleared');
        }
      })
    );
  }
}
