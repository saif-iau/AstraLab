import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../theme.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink , HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  isDarkMode: boolean = false;
  logoUrl: string = '/logo-light.svg';

  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    const savedTheme = this.themeService.getStoredTheme();
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('theme', savedTheme);
    this.updateLogo();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', newTheme);
    this.themeService.saveTheme(newTheme);
    this.updateLogo();
  }

  updateLogo(): void {
    this.logoUrl = this.isDarkMode ? '/logo-dark.svg' : '/logo-light.svg';
    localStorage.setItem('logoUrl', this.logoUrl);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
