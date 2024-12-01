import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:3000/api/request';

  constructor(private http: HttpClient) {}

  sendRequest(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }
  getRequests(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${id}/requests`);
  }
}
