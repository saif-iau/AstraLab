import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../request.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-request-dashboard',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule , HeaderComponent ],
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
    private spinner: NgxSpinnerService
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
      default:
        return ''; // fallback if needed
    }
  }
  fetchRequests(): void {
    this.loading = true;
    this.spinner.show(); // Show spinner when starting the request
    const user = this.authService.getDecodedUser(); // Replace with your method to get user ID
    const id = user.id;

    this.requestService.getRequests(id).subscribe({
      next: (response) => {
        this.requests = response.data;
        this.loading = false;
        this.spinner.hide(); // Hide spinner after getting the response
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
        this.loading = false;
        this.spinner.hide(); // Hide spinner if there's an error
        this.errorMessage = 'Failed to load requests. Please try again later.'; // Set error message
      }
    });
  }

}
