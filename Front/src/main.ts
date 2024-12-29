import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { authInterceptor } from './app/auth.interceptor';
import { LoadingInterceptor } from './app/interceptors/loading.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, LoadingInterceptor])),
    BrowserAnimationsModule,
    ToastrModule,
    NgxSpinnerModule,
    provideToastr({
      timeOut: 3500, // 5 seconds
      positionClass: 'toast-top-center', // Positioning
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
      progressAnimation: 'increasing', // Progress bar animation
      maxOpened: 5, // Max number of visible toasts
      preventDuplicates: true, // Prevent duplicate messages
    }),
    provideAnimations()
  ]
})
.catch(err => console.error(err));
