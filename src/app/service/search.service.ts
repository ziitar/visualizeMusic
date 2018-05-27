import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

// import { SearchResult } from '../class/search-result';
import 'rxjs/add/operator/map';
import {SearchResult} from '../class/search-result';

@Injectable()
export class SearchService {
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
}
