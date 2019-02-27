import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Sheet} from '../class/sheet';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ResponseBody } from '../class/responseBody';

@Injectable()
export class SheetService {
  baseUrl = environment.baseUrl;
  constructor(private http: Http) { }
  getRecommend(): Promise<ResponseBody> {
    return this.http.get(this.baseUrl + 'recommend')
      .toPromise()
      .then(res => res.json() as ResponseBody);
  }
  /*
  *   获取用户歌单
  * */
  getSheet(): Promise<ResponseBody> {
    return this.http.get(this.baseUrl + 'sheet')
      .toPromise()
      .then( res => res.json() as ResponseBody);
  }
  getSongsOfSheetById(id: string): Observable<ResponseBody> {
    return this.http.get(this.baseUrl + 'song?id=' + id)
      .map(res => res.json() as ResponseBody)
      .catch(err => {
        return Observable.of<ResponseBody>();
      });
  }
  getLoveSheet(): Observable<ResponseBody> {
    return this.http.get(this.baseUrl + 'loveSheet')
      .map(res => res.json() as ResponseBody)
      .catch(err => {
        console.log(err);
        return Observable.of<ResponseBody>();
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
