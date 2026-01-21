import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Order, OrderRequest } from "../models/order.model";
import { map, Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";
import { Pageable, PageableRequest } from "../models/pageable.model";

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

  getAll(pageable: PageableRequest): Observable<Pageable<Order>> {
    let params = new HttpParams()
    .set('pageNumber', pageable.pageNumber)
    .set('pageSize', pageable.pageSize)

    if (pageable.asc !== null && pageable.asc !== undefined) {
      params = params.set('asc', String(pageable.asc));
    }
    if (pageable.columnName !== undefined) {
      params = params.set('columnName', pageable.columnName);
    }

    return this.http.get<BaseResponse<Pageable<Order>>>(this.apiUrl, { params }).pipe(
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

  getOrdersBySellerIdPageable(sellerId: number, pageable: PageableRequest, status: string): Observable<Pageable<Order>> {
    let params = new HttpParams()
    .set('status', status || '')
    .set('pageNumber', String(pageable.pageNumber))
    .set('pageSize', String(pageable.pageSize));

    if (pageable.asc !== null && pageable.asc !== undefined) {
      params = params.set('asc', String(pageable.asc));
    }
    if (pageable.columnName !== undefined) {
      params = params.set('columnName', pageable.columnName);
    }

    return this.http.get<BaseResponse<Pageable<Order>>>(`${this.apiUrl}/seller/${sellerId}/pageable`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getMonthlySales(): Observable<BaseResponse<Map<string, number>>> {
    return this.http.get<BaseResponse<Map<string, number>>>(`${this.apiUrl}/monthly-sales`);
  }
}
