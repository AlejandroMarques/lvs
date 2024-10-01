import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent, RouterModule], // Importa RouterModule aquí
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'], // Corrige 'styleUrl' a 'styleUrls'
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  @Input() buttonLabel: string = 'Play'
  @Input() path: string = '/play'
  
  constructor(private movieService: MovieService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.listMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (error) => {
        console.error('Error al cargar las películas:', error);
      },
    });
  }

  onSelect = (params:any): void => {
    this.router.navigate([params.path, params.movie._id]);
  }
}
