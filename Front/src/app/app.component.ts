import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service'; // Import the ThemeService
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Front';
  logoUrl: string = '/logo-light.svg';  // Default logo
  isDarkMode: boolean = false;          // Default theme state

  isLoggedIn$: Observable<boolean>;
  constructor(private themeService: ThemeService, private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.loggedIn$;
  } // Inject the ThemeService

  ngOnInit() {
    const storedTheme = this.themeService.getStoredTheme();
    document.documentElement.setAttribute('theme', storedTheme);
    this.isDarkMode = storedTheme === 'dark';

    // Set the initial logo based on the theme
    this.logoUrl = this.isDarkMode ? '/logo-dark.svg' : '/logo-light.svg';
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
