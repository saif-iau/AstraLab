import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../theme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  showRegisterModal: boolean = true;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  country: string = '';
  userName: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
    // Inject ToastrService
  ) {}

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  register() {
    if (this.password !== this.confirmPassword) {

      return;
    }

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      country: this.country,
      email: this.email,
      password: this.password,
      userName: this.userName
    };

    this.authService.register(userData).subscribe({
      next: (response) => {

        this.closeRegisterModal();
        this.router.navigate(['/login']);
      },
      error: (err) => {

        console.error('Registration failed', err);
      }
    });
  }

  closeOnOutsideClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeRegisterModal();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
