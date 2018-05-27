import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class SongService {
  // baseUrl = 'http://localhost:3000/';
  baseUrl = '/api/';

  constructor(private http: Http) { }
  /*
  *   通过网易云音乐id获取音乐播放地址
  * */
  getUrl(song: number): Observable<any> {
    return this.http.get(this.baseUrl + 'musicUrl?id=' + song)
      .map(res =>  JSON.parse(res['_body']).url );
  }
}
