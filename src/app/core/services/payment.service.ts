import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Payment, PaymentIU } from "../models/payment.model";
import { BaseResponse } from "../models/base-response.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.apiUrl + "/payments";

  constructor(private http: HttpClient) { }

  create(input: PaymentIU): Observable<Payment> {
    return this.http.post<BaseResponse<Payment>>(this.apiUrl, input).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByOrderId(orderId: number): Observable<Payment> {
    return this.http.get<BaseResponse<Payment>>(`${this.apiUrl}/by-order-id/${orderId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByUserId(userId: number): Observable<Payment[]> {
    return this.http.get<BaseResponse<Payment[]>>(`${this.apiUrl}/by-user-id/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  hasSuccessfulPayment(orderId: number): Observable<boolean> {
    return this.http.get<BaseResponse<boolean>>(`${this.apiUrl}/has-successful/${orderId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload !== undefined) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  updatePaymentStatus(orderId: number, newStatus: string, transactionId?: number): Observable<Payment> {
    let params = new HttpParams().set('newStatus', newStatus);

    if (transactionId) {
      params.set('transactionId', transactionId);
    }

    return this.http.put<BaseResponse<Payment>>(`${this.apiUrl}/${orderId}/status`, null, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  refundPaymentItem(orderItemId: number): Observable<Payment> {
    return this.http.put<BaseResponse<Payment>>(`${this.apiUrl}/${orderItemId}/refund`, null).pipe(
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
