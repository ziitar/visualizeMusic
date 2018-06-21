import {Component, OnDestroy, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

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
export class SearchComponent implements OnInit, OnDestroy {
  results: Observable<any[]>;
  resulted: SearchResult[];
  sheets: Sheet[];
  resultIndex = -1;
  sheetMessage: string;
  subscription: Subscription;
  // private searchTerms = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private sheetService: SheetService,
    private songService: SongService
  ) {
    this.subscription = searchService.observerParent$.subscribe(sheets => {
      this.sheets = sheets;
    });
  }

  ngOnInit() {
    this.sheetService.getSheet().subscribe(res => {
      this.sheets = res;
    });
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
    if (this.resultIndex !== num) {
      this.resultIndex = num;
      this.searchService.getSheets()
        .subscribe(res => {
          this.sheets = res;
          if (this.sheets.length === 0) {
            this.sheetMessage = '你还没有歌单';
          }
        });
    }else {
      this.resultIndex = -1;
    }
  }
  addToSheet(sheet: number , result: SearchResult) {
    const data = {
      sheet_id: sheet,
      song: {
        songName: result.name,
        author: result.artists.map(artist => artist.name),
        url: '',
        cloudMusicId: result.id
      }
    };
    this.sheetService.addToSheet(data)
      .subscribe(res => {
        console.log(res);
        this.searchService.updateSheets(res.json() as Sheet[]);
      }, err => {
        console.log(err);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
