import { BaseResponse } from './../../core/models/base-response.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { RegisterRequest } from '../../core/models/auth.model';
import { AuthRequest } from '../../core/models/auth.model';
import { AuthResponse } from '../../core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/auth";
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private roleKey = 'role';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());

  authStatus$ = this.loggedIn$.asObservable();


  constructor(private http: HttpClient) {
    const role = this.getRole();
    this.loggedIn$.next(this.hasValidToken());
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<BaseResponse<AuthResponse>>(`${this.apiUrl}/register`, request).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error('Kayıt yapılamadı');
        }
      })
    )
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<BaseResponse<AuthResponse>>(`${this.apiUrl}/authenticate`, request).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          this.storeTokens(res.payload.accessToken, res.payload.refreshToken, res.payload.role);
          this.loggedIn$.next(true);
          return res.payload;
        } else {
          throw new Error('Giriş başarısız');
        }
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearTokens();
      this.loggedIn$.next(false);
      return of(null);
    }
    return this.http.post<BaseResponse<AuthResponse>>(`${this.apiUrl}/logout`, { refreshToken }).pipe(
      tap(() => {
        this.clearTokens();
        this.loggedIn$.next(false);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  hasValidToken(): boolean {
    const token = this.getAccessToken();

    if (!token) return false;

    const payload = this.parseJwt(token);

    if (!payload || !payload.exp) return false;

    const expiryDate = new Date(payload.exp * 1000);
    return expiryDate > new Date();
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<BaseResponse<AuthResponse>>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      map((res) => {
        if (res.payload) {
          this.storeTokens(res.payload.accessToken, res.payload.refreshToken, res.payload.role);
          return res.payload;
        } else {
          throw new Error('Token yenileme başarısız');
        }
      })
    );
  }

  private storeTokens(access: string, refresh: string, role: string) {
    localStorage.setItem(this.accessTokenKey, access);
    localStorage.setItem(this.refreshTokenKey, refresh);
    localStorage.setItem(this.roleKey, role);
  }

  private clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.roleKey);
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  getCurrentUser(): {id: number, username: string; email?: string} | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const payload = this.parseJwt(token);
    if (!payload) return null;

    return {
      id: payload.id,
      username: payload.sub,
      email: payload.email
    };
  }

  checkEmailExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<BaseResponse<boolean>>(`${this.apiUrl}/check-email`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload !== undefined) return res.payload;
        throw new Error(res.exception?.message);
      })
    );
  }

  resetPassword(email: string, newPassword: string): Observable<void> {
    const params = new HttpParams()
    .set('email', email)
    .set('newPassword', newPassword);

    return this.http.put<BaseResponse<void>>(`${this.apiUrl}/reset-password`, null, { params }).pipe(
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
