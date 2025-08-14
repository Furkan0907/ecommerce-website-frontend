import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { RefundRequest, RefundRequestRequest } from "../models/refund-request.model";
import { map, Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";

@Injectable({
  providedIn: 'root'
})
export class RefundRequestService {
  private apiUrl = environment.apiUrl + "/refund-requests"

  constructor(private http: HttpClient) { }

  create(input: RefundRequestRequest): Observable<RefundRequest> {
    return this.http.post<BaseResponse<RefundRequest>>(this.apiUrl, input).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getById(id: number): Observable<RefundRequest> {
    return this.http.get<BaseResponse<RefundRequest>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAllByUserId(userId: number): Observable<RefundRequest[]> {
    return this.http.get<BaseResponse<RefundRequest[]>>(`${this.apiUrl}/by-user-id/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAll(): Observable<RefundRequest[]> {
    return this.http.get<BaseResponse<RefundRequest[]>>(this.apiUrl).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  approveRefundRequest(id: number): Observable<RefundRequest> {
    return this.http.put<BaseResponse<RefundRequest>>(`${this.apiUrl}/${id}/approve`, {}).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  rejectRefundRequest(id: number): Observable<RefundRequest> {
    return this.http.put<BaseResponse<RefundRequest>>(`${this.apiUrl}/${id}/reject`, {}).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  cancelRefundRequest(id: number): Observable<RefundRequest> {
    return this.http.put<BaseResponse<RefundRequest>>(`${this.apiUrl}/${id}/cancel`, {}).pipe(
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
