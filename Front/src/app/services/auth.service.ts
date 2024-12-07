import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.authUrl}/register`, user).pipe(
      tap((res: any) => this.handleAuthResponse(res)),
      catchError(error => {
        console.error('Registration error:', error);
        return of(null); // Handle error gracefully
      })
    );
  }

  login(user: { identifier: string; password: string; rememberMe: boolean }) {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      tap((res: any) => this.handleAuthResponse(res)),
      catchError(error => {
        console.error('Login error:', error);
        return of(null); // Handle error gracefully
      })
    );
  }

  private handleAuthResponse(res: any) {
    if (res.accessToken) {
      this.storeToken(res.accessToken);
      this.loggedInSubject.next(true);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private checkToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getDecodedUser(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000;
      return expirationDate < Date.now();
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If there's an error, assume the token is invalid/expired
    }
  }
}
