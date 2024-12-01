import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../theme.service';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from '../../components/text-field/text-field.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { RequestComponent } from '../../components/request/request.component';
import { ResponseComponent } from '../../components/response/response.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RequestService } from '../../request.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule , TextFieldComponent , TextAreaComponent , RequestComponent , ResponseComponent ,NgxSpinnerModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDarkMode: boolean = false;
  response:any;
  constructor(private themeService: ThemeService , private requestService:RequestService , private authService:AuthService , private toastr: ToastrService ,    private spinner: NgxSpinnerService) {}


  ngOnInit() {
    // Subscribe to the isDarkMode$ observable to get the current theme
    this.themeService.isDarkMode$.subscribe((isDark: boolean) => {
      this.isDarkMode = isDark;
      console.log('Current theme:', this.isDarkMode ? 'dark' : 'light'); // Log the current theme
    });
  }

  // Optionally, you can create a method to toggle the theme
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.saveTheme(this.isDarkMode ? 'dark' : 'light');
  }

  // Holds the response data



  // Function to handle sending the request
  sendRequest(requestData: any) {
    this.spinner.show();
    const user = this.authService.getDecodedUser();
    const creator = user.id;
    let { url, method, headers, body ,  } = requestData;

    const httpHeaders = new HttpHeaders(
      headers.reduce((acc: any, header: any) => {
        acc[header.key] = header.value;
        return acc;
      }, {})
    );

    this.requestService.sendRequest({...requestData , creator}).subscribe({
      next: (response) => {
        this.toastr.success('Request Successful!', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
          closeButton: true,
          progressBar: true,
        });

        this.response = response;
      },
      error: (err) => {
        this.toastr.error('Something went wrong.', 'Error');
      },
    });
    this.spinner.hide();
}
}
