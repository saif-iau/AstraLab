import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showLoginModal: boolean = true;
  loginIdentifier: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isDarkMode: boolean = false;
  errorMessage: string | null = null;
  logoUrl: string = '/logo-light.svg';
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {} // Inject the ThemeService

  // Function to open the Login modal
  openLoginModal() {
    this.showLoginModal = true;
  }

  // Function to close the Login modal
  closeLoginModal() {
    this.showLoginModal = false;
  }

  // Function to handle the login process
  login() {
    if (!this.loginIdentifier || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    // Log credentials (replace with actual login logic using AuthService)
    console.log('Email:', this.loginIdentifier);
    console.log('Password:', this.password);
    console.log('Login process started...');


    const userData = {

      identifier: this.loginIdentifier,
      password: this.password,
      rememberMe: this.rememberMe
    };


    this.authService.login(userData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.closeLoginModal();
        this.router.navigate(['/dashboard']); // Redirect to dashboard upon successful login
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid login credentials. Please try again.';
      },
    });
  }

  // Redirect to the register page
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Handle outside clicks to close the modal
  closeOnOutsideClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeLoginModal();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode; // Toggle the theme state
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', newTheme);

    // Update the theme in the service
    this.themeService.saveTheme(newTheme);
    this.updateLogo();
  }
  updateLogo() {
    this.logoUrl = this.isDarkMode ? '/logo-dark.svg' : '/logo-light.svg';
    localStorage.setItem('logoUrl', this.logoUrl);
  }


}
