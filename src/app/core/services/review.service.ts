import { Review, ReviewRequest } from './../models/review.model';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.model';
import { Pageable, PageableRequest } from '../models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl + "/reviews";

  constructor(private http: HttpClient) { }

  create(review: ReviewRequest): Observable<Review> {
    return this.http.post<BaseResponse<Review>>(this.apiUrl, review).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getById(id: number): Observable<Review> {
    return this.http.get<BaseResponse<Review>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  update(id: number, input: ReviewRequest): Observable<Review> {
    return this.http.put<BaseResponse<Review>>(`${this.apiUrl}/${id}`, input).pipe(
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

  getAll(pageable: PageableRequest): Observable<Pageable<Review>> {
    let params = new HttpParams()
    .set('pageNumber', pageable.pageNumber)
    .set('pageSize', pageable.pageSize);

    if (pageable.asc !== null) {
      params = params.set('asc', String(pageable.asc));
    }
    if (pageable.columnName !== undefined) {
      params = params.set('columnName', pageable.columnName);
    }

    return this.http.get<BaseResponse<Pageable<Review>>>(this.apiUrl, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByProductId(productId: number, pageable: PageableRequest): Observable<Pageable<Review>> {
    let params = new HttpParams()
    .set('pageNumber', pageable.pageNumber)
    .set('pageSize', pageable.pageSize);

    if (pageable.asc !== null && pageable.asc !== undefined) {
      params = params.set('asc', String(pageable.asc));
    }
    if (pageable.columnName !== undefined) {
      params = params.set('columnName', pageable.columnName);
    }

    return this.http.get<BaseResponse<Pageable<Review>>>(`${this.apiUrl}/product/${productId}/pageable`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByUserId(userId: number): Observable<Review[]> {
    return this.http.get<BaseResponse<Review[]>>(`${this.apiUrl}/user/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  existsByUserIdAndProductId(userId: number, productId: number): Observable<boolean> {
    const params = new HttpParams()
    .set('userId', userId)
    .set('productId', productId);

    return this.http.get<BaseResponse<boolean>>(`${this.apiUrl}/check-exists`, { params })
    .pipe(
      map(res => {
        if (res.status === 200 && res.payload !== undefined && res.payload !== null) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAverageRatingForProduct(productId: number): Observable<number> {
    return this.http.get<BaseResponse<number>>(`${this.apiUrl}/product/${productId}/average-rating`).pipe(
      map(res => {
        if (res.status === 200 && res.payload !== undefined && res.payload !== null) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }
}
