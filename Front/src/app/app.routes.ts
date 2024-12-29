import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestDashboardComponent } from './components/request-dashboard/request-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';




export const routes: Routes = [
  { path: '', component: LandingPageComponent },

  { path: 'home', component: HomeComponent ,  canActivate: [AuthGuard]}, // Protects the route}, // Default route
  { path: 'about', component: AboutComponent }, // Route to About page
  { path: 'requestDashboard', component: RequestDashboardComponent ,canActivate: [AuthGuard] }, // Route to About page

  { path: 'login', component: LoginComponent }, // Login route
  { path: 'register', component: RegisterComponent }, // Register route
  { path: '**', redirectTo: '', pathMatch: 'full'  } // Wildcard route for invalid URLs
];
