import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule] // Add CommonModule here
})
export class CardComponent {
  @Input() title: string = "";
  @Input() content: string = "";
  @Input() imageUrl: string = ""; // Assuming you're using this for the image
}
