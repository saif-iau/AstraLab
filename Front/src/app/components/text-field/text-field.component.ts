import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
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
