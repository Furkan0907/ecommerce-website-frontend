import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, retry, tap } from 'rxjs';
import { RegisterRequest } from '../../core/models/register-request';
import { AuthRequest } from '../../core/models/auth-request';
import { AuthResponse } from '../../core/models/auth-response';

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

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  login(request: AuthRequest): Observable<any> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate`, request).pipe(
      tap(res => {
        this.storeTokens(res.payload.accessToken, res.payload.refreshToken, res.payload.role);
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

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((res) => {
        this.storeTokens(res.payload.accessToken, res.payload.refreshToken, res.payload.role);
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
}
