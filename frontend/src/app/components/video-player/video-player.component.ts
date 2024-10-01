import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
  standalone: true
})
export class VideoPlayerComponent {
  @Input() id: string =''

}
