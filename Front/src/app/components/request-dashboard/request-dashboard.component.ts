import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../request.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-request-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgxSpinnerModule,
    HeaderComponent,
    RouterLinkActive,
    FormsModule,
  ],
  templateUrl: './request-dashboard.component.html',
  styleUrls: ['./request-dashboard.component.scss'],
})
export class RequestDashboardComponent implements OnInit {
  requests: any[] = [];
  paginatedRequests: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  viewMode: string = 'list'; // Default view mode
  currentPage: number = 1;
  pageSize: number = 3; // Number of items per page
  totalPages: number = 1;
  constructor(
    private requestService: RequestService,
    private authService: AuthService,
    private loadingService: LoadingService,
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
  updatePaginatedRequests(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedRequests = this.requests.slice(startIndex, endIndex);
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 600);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRequests();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRequests();
    }
  }

  fetchRequests(): void {
    this.loading = true;

    const user = this.authService.getDecodedUser();
    const id = user.id;

    this.requestService.getRequests(id).subscribe({
      next: (response) => {
        this.requests = response.data;
        this.totalPages = Math.ceil(this.requests.length / this.pageSize);
        this.updatePaginatedRequests();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        if (error.status === 401) {
          this.authService.logout();
          this.errorMessage = 'Session expired. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/']), 2000); // Delay redirection to show message
        } else {
          this.errorMessage =
            'Failed to load requests. Please try again later.';
        }
      },
    });
  }
}
