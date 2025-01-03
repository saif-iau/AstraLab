import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { HeaderComponent } from '../components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [HeaderComponent, FormsModule],
  standalone: true,
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  logoUrl: string = '/logo-light.svg';
  isDarkMode: boolean = false;
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private el: ElementRef,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

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
    // Check if token exists and is valid
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token is expired
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else {
        // Token is valid
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  observeSections(): void {
    const sections = this.el.nativeElement.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section: Element) => {
      observer.observe(section);
    });
  }

  sendEmail(event: Event): void {
    event.preventDefault();
    const emailData = {
      email: this.email,
      subject: this.subject,
      message: `From: ${this.email}\n\n${this.message}`,
    };

    this.http
      .post('http://localhost:3000/api/email/contact', emailData)
      .subscribe({
        next: (response) => {
          this.toastr.success('Email sent successfully');
        },
        error: (error) => {
          console.error('Error sending email:', error);
          this.toastr.error('Error sending email');
        }
      });
  }
}
