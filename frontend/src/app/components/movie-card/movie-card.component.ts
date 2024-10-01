import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../common/button/button.component';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie!: Movie; // Asegúrate de que el tipo coincida con tu modelo
  @Input() buttonLabel: string = 'Enviar'; // Texto del botón
  @Input() buttonParams: any; // Parámetros para el botón
  @Input() onSelect!: (params?: any) => void; // Función a ejecutar al hacer clic

}
