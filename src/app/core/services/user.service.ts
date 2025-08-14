import { User, UserRequest } from '../models/user.model';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { BaseResponse } from '../models/base-response.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<BaseResponse<User[]>>(this.apiUrl).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error('Kullanıcılar yüklenemedi');
        }
      })
    );
  }

  getById(id: number): Observable<User> {
    return this.http.get<BaseResponse<User>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(`ID'si ${id} olan kullanıcı bulunamadı`);
        }
      })
    );
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<BaseResponse<User>>(`${this.apiUrl}/username/${username}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(`ID'si ${username} olan kullanıcı bulunamadı`);
        }
      })
    );
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<BaseResponse<User>>(`${this.apiUrl}/email/${email}`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(`ID'si ${email} olan kullanıcı bulunamadı`);
        }
      })
    );
  }

  update(id: number, newUser: UserRequest): Observable<User> {
    return this.http.put<BaseResponse<User>>(`${this.apiUrl}/${id}`, newUser).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(`ID'si ${id} olan kullanıcı güncellenemedi`);
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
          throw new Error(`ID'si ${id} olan kullanıcı silinemedi`);
        }
      })
    );
  }
}
