import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../../theme.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = 'Front';
  logoUrl: string = '/logo-light.svg';  // Default logo
  isDarkMode: boolean = false;          // Default theme state
  navOpen: boolean = false;
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

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  updateLogo() {
    this.logoUrl = this.isDarkMode ? '/logo-dark.svg' : '/logo-light.svg';
    localStorage.setItem('logoUrl', this.logoUrl);
  }

  logout() {
    this.authService.logout(); // Call the logout method in AuthService
    this.router.navigate(['/landing']); // Redirect to the login page or home
  }


}
