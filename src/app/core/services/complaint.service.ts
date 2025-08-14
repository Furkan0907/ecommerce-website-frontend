import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Complaint, ComplaintRequest } from "../models/complaint.model";
import { map, Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = environment.apiUrl + "/complaints";

  constructor(private http: HttpClient) { }

  create(input: ComplaintRequest): Observable<Complaint> {
    return this.http.post<BaseResponse<Complaint>>(this.apiUrl, input).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAll(): Observable<Complaint[]> {
    return this.http.get<BaseResponse<Complaint[]>>(this.apiUrl).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getAllByUserId(userId: number): Observable<Complaint[]> {
    return this.http.get<BaseResponse<Complaint[]>>(`${this.apiUrl}/user/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getById(id: number): Observable<Complaint> {
    return this.http.get<BaseResponse<Complaint>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  markAsResolved(id: number): Observable<void> {
    return this.http.put<BaseResponse<void>>(`${this.apiUrl}/${id}/resolved`, {}).pipe(
      map(res => {
        if (res.status === 200) {
          return;
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
}
