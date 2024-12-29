
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  show() {
    this.loadingSubject.next(true);
    console.log(this.loadingSubject);
  }

  hide() {
    this.loadingSubject.next(false);
    console.log(this.loadingSubject);

  }
}
