import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Sheet} from '../class/sheet';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class SheetService {
  baseUrl = environment.baseUrl;
  constructor(private http: Http) { }
  getRecommend(): Promise<Sheet> {
    return this.http.get(this.baseUrl + 'recommend')
      .toPromise()
      .then(res => res.json() as Sheet);
  }
  /*
  *   获取用户歌单
  * */
  getSheet(): Observable<Sheet[]> {
    return this.http.get(this.baseUrl + 'sheet')
      .map(res => res.json() as Sheet[])
      .catch(err => {
        return Observable.of<Sheet[]>([]);
      });
  }
  getSongsOfSheetById(id: string): Observable<Sheet> {
    return this.http.get(this.baseUrl + 'song?id=' + id)
      .map(res => res.json() as Sheet)
      .catch(err => {
        return Observable.of<Sheet>();
      });
  }
  getLoveSheet(): Observable<Sheet[]> {
    return this.http.get(this.baseUrl + 'loveSheet')
      .map(res => res.json() as Sheet[])
      .catch(err => {
        console.log(err);
        return Observable.of<Sheet[]>([]);
      });
  }
  /*
  *   创建歌单
  * */
  createSheet(form: any): Observable<any> {
    return this.http.post(this.baseUrl + 'sheet', form)
      .map(res => res)
      .catch(err => {
        console.log(err);
        return Observable.of<Sheet[]>([]);
      });
  }
  addToSheet(data: any ): Observable<any> {
    return this.http.put(this.baseUrl + 'sheet', data)
      .map(res => res);
  }
}
