import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { SheetService } from '../service/sheet.service';
import { Sheet} from '../class/sheet';
import { Song } from '../class/song';

@Component({
  selector: 'app-music-sheet',
  templateUrl: './music-sheet.component.html',
  styleUrls: ['./music-sheet.component.css']
})
export class MusicSheetComponent implements OnInit {
  @Input() sheetType: Number;
  @Input() playSheet: Sheet;
  @Input() playSong: Song;
  @Output() onPlayed = new EventEmitter<Song>();
  @Output() onSheeted = new EventEmitter<Sheet>();
  sheets: Sheet[] = [];
  selected = -1;
  constructor(private sheetService: SheetService) { }
  ngOnInit() {
    /*
    *   初始化判断歌单类型，
    *   1代表系统推荐歌单，2代表本地歌单，
    *   3代表用户创建的歌单，4代表用户收藏的歌单
    * */
    if (this.sheetType === 1) {
      this.sheetService.getRecommend().then(sheet => {
        this.sheets = [sheet];
      }).catch(err => {
        console.log(err);
      });
    }else if (this.sheetType === 2) {
    }else if (this.sheetType === 3) {
      this.sheetService.getSheet().subscribe(sheets => {
        this.sheets = sheets;
      });
    }else if (this.sheetType === 4) {
      this.sheetService.getLoveSheet().subscribe(sheets => {
        this.sheets = sheets;
      });
    }
  }
  select(selectId: number) {
    if (this.selected === -1) {
      this.selected = selectId;
    }else {
      this.selected = -1;
    }
  }
  stopPropagation($e: any) {
    if ($e.stopPropagation) {
      $e.stopPropagation();
    }
  }
  play( song: Song, sheet: Sheet) {
    this.onPlayed.emit(song);
    this.onSheeted.emit(sheet);
  }
}
