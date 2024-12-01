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

      if (res.refreshToken) {
        this.storeRefreshToken(res.refreshToken); // Store refresh token securely
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
    console.log(this.loggedInSubject)
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value; // Return current logged-in status
  }

  getToken(): string | null {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  private checkToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  private storeRefreshToken(token: string) {
    // Implement secure storage for the refresh token (e.g., HttpOnly cookie)
    document.cookie = `refreshToken=${token}; HttpOnly; Max-Age=604800;`; // 7 days
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
  checkAndLogoutIfTokenExpired() {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.refreshAccessToken().subscribe(); // Automatically refresh
    }
  }
  refreshAccessToken() {
    return this.http.post(`${this.authUrl}/refreshToken`, {}).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          this.storeToken(res.accessToken); // Store new access token
        }
      }),
      catchError(error => {
        console.error('Token refresh error:', error);
        this.logout(); // Log out if refresh fails
        return of(null); // Handle error gracefully
      })
    );
  }
  private getRefreshToken(): string | null {
    // Implement logic to retrieve the refresh token from cookies
    const match = document.cookie.match(/refreshToken=([^;]+)/);
    return match ? match[1] : null;
  }
}
