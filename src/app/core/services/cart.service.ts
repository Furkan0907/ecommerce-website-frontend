import { AuthService } from './../../authentication/service/auth.service';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";
import { Cart, CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';

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
    this.http.get<BaseResponse<CartItem[]>>(`${this.apiUrl}/${userId}/items`).subscribe({
      next: (response) => {
        if (response.status === 200 && response.payload) {
          const count = response.payload.length;
          this.cartItemCountSubject.next(count);
        }
      },
      error: () => this.cartItemCountSubject.next(0)
    });
  }

  updateCartItemCount(newCount: number) {
    this.cartItemCountSubject.next(newCount);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<BaseResponse<Cart>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<BaseResponse<Cart[]>>(this.apiUrl).pipe(
      map(res => {
        if(res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  addItemToCart(userId: number, productId: number, quantity: number = 1): Observable<CartItem> {
    const params = new HttpParams()
    .set('productId', productId.toString())
    .set('quantity', quantity.toString());

    return this.http.post<BaseResponse<CartItem>>(`${this.apiUrl}/${userId}/items`,
      null,
      { params }
    ).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          this.loadCartItemCount();
          return response.payload;
        } else {
          throw new Error('Can not add to cart');
        }
      })
    );
  }

  getCartByUserId(userId: number): Observable<CartItem[]> {
    return this.http.get<BaseResponse<CartItem[]>>(`${this.apiUrl}/by-user-id/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error('Kullanıcının sepeti boş');
        }
      })
    );
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<BaseResponse<CartItem[]>>(`${this.apiUrl}/${userId}/items`).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error('Cart item has not get')
        }
      })
    );
  }

  updateItemQuantity(userId: number, productId: number, quantity: number): Observable<CartItem> {
    const params = new HttpParams()
    .set('productId', productId.toString())
    .set('quantity', quantity.toString());

    return this.http.put<BaseResponse<CartItem>>(`${this.apiUrl}/${userId}/items`, null, { params }).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error('Product quantity could not be updated');
        }
      })
    );
  }

  removeItemFromCart(userId: number, productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId.toString());

    return this.http.delete<BaseResponse<void>>(`${this.apiUrl}/${userId}/items`, { params }).pipe(
      map(response => {
        if (response.status === 200) {
          this.loadCartItemCount();
          return;
        } else {
          throw new Error('Product could not been removed from the cart');
        }
      })
    );
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<BaseResponse<void>>(`${this.apiUrl}/${userId}/clear`).pipe(
      map(response => {
        if (response.status === 200) {
          this.loadCartItemCount();
          return;
        } else {
          throw new Error('Cart could not cleared');
        }
      })
    );
  }

  confirmCart(userId: number, addressId: number): Observable<Order> {
    return this.http.post<BaseResponse<Order>>(`${this.apiUrl}/${userId}/confirm`, addressId).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }
}
