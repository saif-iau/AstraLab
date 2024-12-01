import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private router: Router , private themeService: ThemeService) {}
  isDarkMode: boolean = false;
  logoUrl: string = '/logo-light.svg';

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
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
