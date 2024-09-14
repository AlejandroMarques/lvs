import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-select-movie-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './select-movie-card.component.html',
  styleUrl: './select-movie-card.component.css'
})
export class SelectMovieCardComponent {
  @Input() movie:Movie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    poster_path: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    release_date: new Date(),
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  };

  @Output() selectMovie = new EventEmitter<number>();

  onSelect(): void {
    this.selectMovie.emit();
  }
}
