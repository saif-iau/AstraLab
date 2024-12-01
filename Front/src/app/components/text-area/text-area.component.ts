import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class TextAreaComponent {
  @Input() label?: string; // Optional label
  @Input() value = ''; // Input value
  @Input() placeholder = ''; // Placeholder text
  @Input() theme: 'dark' | 'light' = 'light'; // Dark/Light theme
  @Input() errorMessage?: string; // Error message
  @Input() disabled = false; // Disabled state
  @Input() width = '100%'; // Width customization
  @Input() height = 'auto'; // Height customization
  @Input() borderRadius = '8px'; // Border radius customization
  @Input() gradientLight = 'linear-gradient(90deg, #007bff, #00d4ff)'; // Light mode gradient
  @Input() gradientDark = 'linear-gradient(to right, #3b82f6, #9333ea)'; // Dark mode gradient

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value; // Update the value on input
  }
}
