import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable()
export class UtilService {
    constructor(private http: HttpClient, private datePipe: DatePipe) { }

    getAPIData() {
        let yest = new Date();
        yest.setDate(yest.getDate() - 1)
        const date = this.datePipe.transform(yest, 'yyyy-MM-dd');
        console.log(date)
        return this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&publishedAfter=${date}T00:00:00Z&key={APIKey}`)
            .pipe(map(res => {
                let temp: any = res;
                let data = temp.items;
                data.map(video => {
                    if (video.id.videoId) {
                        this.getAPILikesData(video.id.videoId).subscribe(vid => {
                            let videoData: any = vid;
                            video.viewCount = videoData.items[0].statistics.viewCount;
                        })
                    }
                    return video;
                })
                return data;
            }));
    }

    getAPILikesData(videoID) {
        return this.http.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoID}&key={APIKey}`);
    }
}