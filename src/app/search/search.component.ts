import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchService } from '../service/search.service';
import { SheetService } from '../service/sheet.service';
import {SearchResult} from '../class/search-result';
import {Sheet} from '../class/sheet';
import {SongService} from '../service/song.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: Observable<any[]>;
  resulted: SearchResult[];
  sheets: Sheet[];
  resultIndex: number;
  sheetMessage: string;
  // private searchTerms = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private sheetService: SheetService,
    private songService: SongService
  ) { }

  ngOnInit() {
    // this.results = this.searchTerms
    //   .debounceTime(300)
    //   .distinctUntilChanged()
    //   .switchMap( term => term ? this.searchService.search(term) : Observable.of<any[]>([]))
    //   .catch(error => {
    //     console.log(error);
    //     return Observable.of<any[]>([]);
    //   });
  }
  // search(term: string) {
  //   this.searchTerms.next(term);
  // }
  /*
  *   发起搜索服务请求
  * */
  doSearch(keywords: string) {
    this.searchService.search(keywords)
      .subscribe(res => {
        this.resulted = res;
      });
  }
  selectSheet(num: number ) {
    this.resultIndex = num;
    this.sheetService.getSheet()
      .subscribe(res => {
        this.sheets = res;
        if (this.sheets.length === 0) {
          this.sheetMessage = '你还没有歌单';
        }
      }, err => {
        this.sheetMessage = '你还没有登录';
      });
  }
  addToSheet(sheet: number , result: SearchResult) {
    this.songService.getUrl(result.id)
      .subscribe(url => {
        if (url !== '') {
          const cloudUrl = url.toString().replace('http://m10.music.126.net', '/cloudMusic');
          const data = {
            sheet_id: sheet,
            song: {
              songName: result.name,
              author: result.artists.map(artist => artist.name),
              url: cloudUrl,
              cloudMusicId: result.id
            }
          };
          this.sheetService.addToSheet(data)
            .subscribe(res => {
              if (res) {
                console.log(res);
              }
            });
        }
      });
  }
}
