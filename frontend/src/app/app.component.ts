import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UploadMovieComponent } from './components/upload-movie/upload-movie.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,UploadMovieComponent, VideoPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
