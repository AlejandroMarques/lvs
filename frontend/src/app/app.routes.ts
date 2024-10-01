import { Routes } from '@angular/router';
import { UploadMovieComponent } from './components/upload-movie/upload-movie.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

export const routes: Routes = [
  {path: 'upload', component:UploadMovieComponent},
  {path: 'play/:id', component: VideoPlayerComponent}
];
