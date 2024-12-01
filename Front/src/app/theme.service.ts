import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(this.getStoredTheme() === 'dark');
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  // Method to get the stored theme from localStorage
  getStoredTheme(): string {
    return localStorage.getItem('theme') || 'light';
  }

  // Method to save the theme in localStorage
  saveTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.isDarkModeSubject.next(theme === 'dark'); // Update the subject value
  }

  // Optional: Method to set dark mode directly if needed
  setDarkMode(isDarkMode: boolean): void {
    const theme = isDarkMode ? 'dark' : 'light';
    this.saveTheme(theme);
  }
}
