import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';
import {SearchResult} from '../class/search-result';
import {Subject } from 'rxjs/Subject';
import {Sheet} from '../class/sheet';

@Injectable()
export class SearchService {
  observerParentSource = new Subject<Sheet[]>();
  observerChildSource = new Subject<Sheet[]>();

  observerParent$ = this.observerParentSource.asObservable();
  observerChild$ = this.observerChildSource.asObservable();

  // baseUrl = 'http://localhost:3000/';
  baseUrl = '/api/';
  constructor(private http: Http ) { }
  /*
  *   通过关键词搜索歌曲、歌手、专辑等
  * */
  search(term: string ): Observable<any> {
    return this.http
      .get(this.baseUrl + 'search?keywords=' + term)
      .map(res => res.json() as SearchResult[]);
  }
  sendSheets(sheets: Sheet[]) {
    this.observerParentSource.next(sheets);
  }
  updateSheets(sheets: Sheet[]) {
    this.observerChildSource.next(sheets);
  }
  getSheets() {
    return this.http.get(this.baseUrl + 'sheet')
      .map(res => res.json() as Sheet[]);
  }
}
