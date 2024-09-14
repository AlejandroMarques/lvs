import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import {Movie} from '../../models/movie.model'
import { SelectMovieCardComponent } from '../select-movie-card/select-movie-card.component';
@Component({
  selector: 'app-upload-movie',
  standalone: true,
  imports: [SelectMovieCardComponent],
  templateUrl: './upload-movie.component.html',
  styleUrl: './upload-movie.component.css'
})
export class UploadMovieComponent {
  movies:Movie[] = []
  movieService = inject(MovieService)

  onSubmit = (event: MouseEvent, movieTitle: string) => {
    event.preventDefault();
    if (!movieTitle) return;
    this.movieService.searchMovies(movieTitle).subscribe({
      next: (movies) => this.movies = movies,
      error: (error) => console.error(error)
    })
  }

  onSelect = (movieId: number) => {
    if (!movieId) return;
    this.movieService.getMovie(movieId).subscribe({
      next: (movie) => console.log(movie),
      error: (error) => console.error(error)
    })
  } 
}
