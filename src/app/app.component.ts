import { Component } from '@angular/core';
import { UtilService } from './util.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OfTheDay';
  videos: any;
  player: YT.Player;
  video1: any;

  constructor(private util: UtilService) {
    util.getAPIData().subscribe(vid => {
      this.videos = vid;
    })
  }
  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
  }
}
