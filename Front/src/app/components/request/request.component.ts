import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-request',
  imports:[CommonModule , FormsModule , HeaderComponent],
  standalone:true,
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent {
  @Input() url = '';
  @Input() method = 'GET';
  @Input() headers: { key: string; value: string }[] = [];
  @Input() queryParams: { key: string; value: string }[] = [];
  @Input() body = '';
  @Input() description = '';

  @Output() onSendRequest = new EventEmitter<any>();

  // Emit the request details
  sendRequest() {
    const requestData = {
      pageUrl: this.url,
      method: this.method,
      headers: this.headers,
      queryParams: this.queryParams,
      body: this.body,
      description: this.description,
    };
    this.onSendRequest.emit(requestData);
  }

  // Add and remove header
  addHeader() {
    this.headers.push({ key: '', value: '' });
  }
  removeHeader(index: number) {
    this.headers.splice(index, 1);
  }

  // Add and remove query parameter
  addQueryParam() {
    this.queryParams.push({ key: '', value: '' });
  }
  removeQueryParam(index: number) {
    this.queryParams.splice(index, 1);
  }
}
