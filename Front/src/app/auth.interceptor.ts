import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (token && authService.isTokenExpired(token)) {
    // Attempt to refresh the token if it's expired
    return authService.refreshAccessToken().pipe(
      switchMap((res) => {
        const newToken = authService.getToken(); // Get updated token after refresh
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${newToken}` }
        });
        return next(authReq);
      }),
      catchError((error) => {
        // Log out and redirect if the refresh fails
        authService.logout();
        router.navigate(['/login']);
        return throwError(error); // Handle and propagate error
      })
    );
  }

  // Clone request with Authorization header if token exists and is valid
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq);
};
