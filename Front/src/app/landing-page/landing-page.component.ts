import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { HeaderComponent } from '../components/header/header.component';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [HeaderComponent],
  standalone:true
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  logoUrl: string = '/logo-light.svg';
  isDarkMode: boolean = false;

  constructor(private router: Router, private themeService: ThemeService, private el: ElementRef) {}

  ngOnInit(): void {
    const savedTheme = this.themeService.getStoredTheme();
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('theme', savedTheme);
    this.updateLogo();
  }

  ngAfterViewInit(): void {
    this.observeSections();
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

  observeSections(): void {
    const sections = this.el.nativeElement.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach((section: Element) => {
      observer.observe(section);
    });
  }
}
