import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../request.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-request-dashboard',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule , HeaderComponent , RouterLinkActive ],
  templateUrl: './request-dashboard.component.html',
  styleUrls: ['./request-dashboard.component.scss']
})
export class RequestDashboardComponent implements OnInit {
  requests: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchRequests();
  }
  getMethodClass(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'get';
      case 'POST':
        return 'post';
      case 'PUT':
        return 'put';
      case 'DELETE':
        return 'delete';
        case 'OPTIONS':
        return 'options';
        case 'PATCH':
        return 'patch';
        case 'HEAD':
        return 'head';
      default:
        return ''; // fallback if needed
    }
  }
  fetchRequests(): void {
    this.loading = true;
    this.spinner.show();
    const user = this.authService.getDecodedUser();
    const id = user.id;

    this.requestService.getRequests(id).subscribe({
      next: (response) => {
        this.requests = response.data;
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        this.loading = false;
        this.spinner.hide();
        if (error.status === 401) {
          this.authService.logout();
          this.errorMessage = 'Session expired. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/']), 2000); // Delay redirection to show message
        } else {
          this.errorMessage = 'Failed to load requests. Please try again later.';
        }
      },
    });
  }


}
