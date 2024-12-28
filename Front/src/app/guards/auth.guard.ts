import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Directly access the token without relying on AuthService
    console.log(token)
    if (token) {
      console.log(token)
      console.log('Token found, allowing access');
      return true;
    } else {
      console.log('No token found, redirecting to login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
