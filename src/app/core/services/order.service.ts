import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Order, OrderRequest } from "../models/order.model";
import { map, Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Order> {
    return this.http.get<BaseResponse<Order>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAll(): Observable<Order[]> {
    return this.http.get<BaseResponse<Order[]>>(this.apiUrl).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByUserId(userId: number): Observable<Order[]> {
    return this.http.get<BaseResponse<Order[]>>(`${this.apiUrl}/by-user-id/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  update(id: number, order: OrderRequest): Observable<Order> {
    return this.http.put<BaseResponse<Order>>(`${this.apiUrl}/${id}`, order).pipe(
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
    );
  }

  confirmPayment(id: number): Observable<Order> {
    return this.http.put<BaseResponse<Order>>(`${this.apiUrl}/${id}/confirm-payment`, null).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  cancel(id: number): Observable<Order> {
    return this.http.put<BaseResponse<Order>>(`${this.apiUrl}/${id}/cancel`, null).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getOrderStatus(id: number): Observable<string> {
    return this.http.get<BaseResponse<string>>(`${this.apiUrl}/${id}/status`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  markOrderShipped(id: number): Observable<Order> {
    return this.http.put<BaseResponse<Order>>(`${this.apiUrl}/${id}/ship`, null).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  deliverOrder(id: number): Observable<Order> {
    return this.http.put<BaseResponse<Order>>(`${this.apiUrl}/${id}/deliver`, null).pipe(
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
