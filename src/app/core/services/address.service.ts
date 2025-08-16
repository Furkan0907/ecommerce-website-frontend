import { Address, AddressRequest } from './../models/address.model';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.apiUrl + '/addresses';

  constructor(private http: HttpClient) { }

  save(newAddress: AddressRequest): Observable<Address> {
    return this.http.post<BaseResponse<Address>>(this.apiUrl, newAddress).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getById(id: number): Observable<Address> {
    return this.http.get<BaseResponse<Address>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByUserId(userId: number): Observable<Address[]> {
    return this.http.get<BaseResponse<Address[]>>(`${this.apiUrl}/user/${userId}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  update(id: number, updatedAddress: AddressRequest): Observable<Address> {
    return this.http.put<BaseResponse<Address>>(`${this.apiUrl}/${id}`,  updatedAddress).pipe(
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
}
