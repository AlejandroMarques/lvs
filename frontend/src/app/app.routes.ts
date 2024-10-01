import { Routes } from '@angular/router';
import { UploadMovieComponent } from './components/upload-movie/upload-movie.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { HomeComponent } from './routes/home/home.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { MovieComponent } from './routes/movie/movie.component';

export const routes: Routes = [
  {path: 'upload', component:UploadMovieComponent},
  {path: 'play/:id', component: VideoPlayerComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movie/:id', component: MovieComponent},
  {path: '', component: HomeComponent},
];
