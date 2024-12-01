import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent {
  @Input() response: any; // Input property to display the response
}
