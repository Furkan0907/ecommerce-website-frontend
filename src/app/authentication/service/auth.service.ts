import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, retry, tap } from 'rxjs';
import { RegisterRequest } from '../../models/register-request';
import { AuthRequest } from '../../models/auth-request';
import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = enviroment.apiUrl + "/auth";
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasValidToken());

  constructor(private http: HttpClient) { }

  authStatus$ = this.loggedIn$.asObservable();

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  login(request: AuthRequest): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request).pipe(
      tap(res => {
        this.storeTokens(res.payload.accessToken, res.payload.refreshToken);
        this.loggedIn$.next(true);
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
    return this.http.post(`${this.apiUrl}/logout`, { refreshToken }).pipe(
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

  hasValidToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    const payload = this.parseJwt(token);
    if (!payload || payload.exp) return false;

    const expiryDate = new Date(payload.exp * 1000);
    return expiryDate > new Date();
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((res) => {
        this.storeTokens(res.payload.accessToken, res.payload.refreshToken);
      })
    );
  }

  private storeTokens(access: string, refresh: string) {
    localStorage.setItem(this.accessTokenKey, access);
    localStorage.setItem(this.refreshTokenKey, refresh);
  }

  private clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16).slice(-2)))
        .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  getCurrentUser(): {username: string; email?: string} | null {
    const token = this.getAccessToken();
    if (!token) return null;

    const payload = this.parseJwt(token);
    if (!payload) return null;

    return {
      username: payload.sub,
      email: payload.email
    };
  }
}
