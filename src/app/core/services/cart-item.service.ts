import { CartItem, CartItemRequest } from './../models/cart.model';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private apiUrl = environment.apiUrl + "/cart-items";

  constructor(private http: HttpClient) { }

  create(input: CartItemRequest): Observable<CartItem> {
    return this.http.post<BaseResponse<CartItem>>(this.apiUrl, input).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getById(id: number): Observable<CartItem> {
    return this.http.get<BaseResponse<CartItem>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAll(): Observable<CartItem[]> {
    return this.http.get<BaseResponse<CartItem[]>>(this.apiUrl).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  update(id: number, item: CartItemRequest): Observable<CartItem> {
    return this.http.put<BaseResponse<CartItem>>(`${this.apiUrl}/${id}`, item).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<BaseResponse<CartItem>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200) {
          return;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }
}
