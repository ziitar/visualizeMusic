import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {SongService} from '../service/song.service';

import {Lyric} from '../class/lyric';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-lyric',
  templateUrl: './lyric.component.html',
  styleUrls: ['./lyric.component.css']
})
export class LyricComponent implements OnInit, OnDestroy {
  lyrics: Lyric[];
  lyricMessage: string;
  subscription: Subscription;
  songId$: Observable<string>;
  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.songService.observerSource.subscribe(song => {
      if (song.cloudMusicId) {
        this.songService.getLyric(song.cloudMusicId).subscribe(lyric => {
          this.lyricMessage = null;
          const constLyric = lyric.json().lyric.split('\n');
          const reg = new RegExp(/(\d{2}:\d{2}.\d*)/, 'i');
          let match ;
          let LYR: Lyric;
          this.lyrics = constLyric.map(res => {
            match = reg.exec(res);
            try {
              LYR = {
                time : match[0],
                text : res.replace('[' + match[0] + ']', '')
              };
              return LYR;
            }catch (e) {
              return {
                time: '',
                text: res
              };
            }
          });
        });
      }else {
        this.lyricMessage = '找不到歌词';
      }
    });
  }

  ngOnInit() {
    this.songId$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.songService.getLyric(params.get('id')).map(res => {
          return res.json().lyric;
        });
      }
    );
    this.songId$.subscribe(lyric => {
      if (lyric === 'false') {
        this.lyricMessage = '还没选中歌曲';
      } else {
        this.lyricMessage = null;
        const constLyric = lyric.split('\n');
        const reg = new RegExp(/(\d{2}:\d{2}.\d*)/, 'i');
        let match ;
        let LYR: Lyric;
        this.lyrics = constLyric.map(res => {
          match = reg.exec(res);
          try {
            LYR = {
              time : match[0],
              text : res.replace('[' + match[0] + ']', '')
            };
            return LYR;
          }catch (e) {
            return {
              time: '',
              text: res
            };
          }
        });
      }
    }, err => {
      this.lyricMessage = '还没选中歌曲';
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
