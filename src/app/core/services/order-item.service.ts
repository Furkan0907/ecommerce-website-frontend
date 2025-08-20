import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { OrderItem, OrderItemRequest } from "../models/order.model";
import { map, Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiUrl = environment.apiUrl + "/order-items";

  constructor(private http: HttpClient) { }

  create(input: OrderItemRequest): Observable<OrderItem> {
    return this.http.post<BaseResponse<OrderItem>>(this.apiUrl, input).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getById(id: number): Observable<OrderItem> {
    return this.http.get<BaseResponse<OrderItem>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAllByOrderId(orderId: number): Observable<OrderItem[]> {
    return this.http.get<BaseResponse<OrderItem[]>>(`${this.apiUrl}/by-order-id/${orderId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  update(id: number, input: OrderItemRequest): Observable<OrderItem> {
    return this.http.put<BaseResponse<OrderItem>>(`${this.apiUrl}/${id}`, input).pipe(
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
    return this.http.delete<BaseResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200) {
          return;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    )
  }

  deliverOrderItem(id: number): Observable<OrderItem> {
    return this.http.put<BaseResponse<OrderItem>>(`${this.apiUrl}/${id}/deliver`, null).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  markOrderItemShipped(id: number): Observable<OrderItem> {
    return this.http.put<BaseResponse<OrderItem>>(`${this.apiUrl}/${id}/ship`, null).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  cancelOrderItem(id: number): Observable<OrderItem> {
    return this.http.put<BaseResponse<OrderItem>>(`${this.apiUrl}/${id}/cancel`, null).pipe(
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
