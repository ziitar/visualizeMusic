import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

import { Subject } from 'rxjs/Subject';
import {Song} from '../class/song';
import { environment } from '../../environments/environment';
import { ResponseBody } from '../class/responseBody';

@Injectable()
export class SongService {
  observerSource = new Subject<Song>();
  observer$ = this.observerSource.asObservable();

  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }
  /*
  *   通过网易云音乐id获取音乐播放地址
  * */
  getUrl(song: number): Observable<ResponseBody> {
    return this.http.get(this.baseUrl + 'musicUrl?id=' + song)
      .map(res =>  res.json() as ResponseBody );
  }
  getLyric(song: any): Observable<ResponseBody> {
    return this.http.get(this.baseUrl + 'lyric?id=' + song)
      .map(res => res.json() as ResponseBody);
  }
  songChange(song: Song) {
    this.observerSource.next(song);
  }
}
