import {Component, ElementRef, OnInit} from '@angular/core';

import { UserService } from './service/user.service';
import { SheetService } from './service/sheet.service';
import { Song } from './class/song';
import { Sheet } from './class/sheet';
import { User } from './class/user';

import { Subscription } from 'rxjs/Subscription';
import {SearchService} from './service/search.service';
import {SongService} from './service/song.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  playMusicStatus = {
    name: '',
    url: '',
    played: false,
    rangeValue: 0,
    volume: 50
  };
  song: Song;
  preSong: Song[] = [];
  sheet: Sheet;
  actionType;
  audio: any;
  user: any;
  main = false;
  musicUrlOffset = 'http://localhost:2345/public';
  // musicUrlOffset = '/public';
  model = {
    sheetName: ''
  };
  createSheetMessage: string;
  subscription: Subscription;
  constructor(
    private el: ElementRef,
    private userService: UserService,
    private sheetService: SheetService,
    private searchService: SearchService,
    private songService: SongService
  ) {
    this.subscription = searchService.observerChild$.subscribe(sheets => {
      this.user.sheets = sheets;
    });
  }
  ngOnInit(): void {
    /*
    *   初始化组件后获得session中的用户信息
    * */
    this.userService.getUser()
      .then(res => {
        if (res.status === 'SUCCESS') {
          if (!res.result.headUrl) {
            if (res.result.sex === 'male') {
              res.result.headUrl = environment.imageUrl + 'defaultMale.jpg';
            }else {
              res.result.headUrl = environment.imageUrl + 'defaultFemale.jpg';
            }
          }
          this.user = res.result;
        }
      });
    /*
    *   得到audio标签对象并控制audio
    * */
    this.audio = this.el.nativeElement.querySelector('#audio');
    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration && this.audio.currentTime) {
        this.playMusicStatus.rangeValue = this.audio.currentTime / this.audio.duration * 100;
      }else {
        this.playMusicStatus.rangeValue = 0;
      }
    });
    this.audio.addEventListener('ended', () => {
        const lastSongIndex = Math.round(Math.random() * (this.sheet.songNum - 1));
        this.preSong.push(this.song);
        this.song = this.sheet.songs[lastSongIndex];
        this.setUrl();
    });
  }
  setUrl() {
    if (this.song.cloudMusicId) {
      this.songService.getUrl(this.song.cloudMusicId)
        .subscribe(res => {
          this.playMusicStatus.url = res.toString().replace('http://m10.music.126.net/', '/cloudMusic/');
          // this.playMusicStatus.url = res;
          this.songService.songChange(this.song);
          this.loadMusic();
        });
    }else {
      this.playMusicStatus.url = this.musicUrlOffset + this.song.url;
      this.songService.songChange(this.song);
      this.loadMusic();
    }
  }
  /*
  *   加载audio并进行播放
  * */
  loadMusic() {
    this.audio.src = this.playMusicStatus.url;
    this.audio.load();
    this.audio.play();
    this.playMusicStatus.played = true;
  }
  /*
  * 控制音量
  * */
  setVolume($e: any): void {
    this.playMusicStatus.volume = $e.target.value;
    this.audio.volume = $e.target.value * 0.01;
  }
  /*
  * 控制播放
  * */
  isPlay(): void {
    if (this.playMusicStatus.played) {
      this.audio.pause();
      this.playMusicStatus.played = false;
    }else {
      this.audio.play();
      this.playMusicStatus.played = true;
    }
  }
  /*
  * 控制播放进度
  * */
  setRange($e: any ): void {
    if (this.playMusicStatus.played) {
      this.audio.currentTime = $e.target.value * this.audio.duration / 100;
    }else {
      $e.target.value = 0;
    }
  }
  /*
  *   播放上一首和下一首
  * */
  prePlay() {
    if (this.preSong.length !== 0) {
      this.song = this.preSong.shift();
      this.setUrl();
    }
  }
  nextPlay() {
    if (this.sheet) {
      const lastSongIndex = Math.round(Math.random() * (this.sheet.songNum - 1));
      this.preSong.push(this.song);
      this.song = this.sheet.songs[lastSongIndex];
      this.setUrl();
    }
  }
  recommend() {
    this.actionType = 1;
  }
  local() {
    this.actionType = 2;
  }
  mine() {
    this.actionType = 3;
  }
  collection() {
    this.actionType = 4;
  }
  choosePlay(song: Song) {
    if (this.song) {
      this.preSong.push(this.song);
      this.song = song;
      this.setUrl();
    }else {
      this.song = song;
      this.setUrl();
    }
  }
  chooseSheet(sheet: Sheet) {
    this.sheet = sheet;
  }
  setUser(user: User) {
    this.user = user;
    if (!this.user.headUrl) {
      if (this.user.sex === 'male') {
        this.user.headUrl = environment.imageUrl + 'defaultMale.jpg';
      }else {
        this.user.headUrl = environment.imageUrl + 'defaultFemale.jpg';
      }
    }
  }
  createSheet() {
    if (this.user) {
      this.sheetService.createSheet(this.model)
        .subscribe(res => {
          if (res.status === 200) {
            this.user.sheets = res.json() as Sheet[];
            this.searchService.sendSheets(this.user.sheets);
            this.createSheetMessage = '创建成功关闭弹框';
          }else {
            this.createSheetMessage = '创建失败关闭弹框';
          }
      });
    }else {
      this.createSheetMessage = '你还没有登录，关闭弹出然后登录';
    }
  }
  signOut() {
    this.userService.signOut()
      .then(res => {
        if (JSON.parse(res).message === 'ok') {
          this.audio.stop();
          this.user = null;
          this.sheet = null;
          this.song = null;
          this.preSong = null;
          this.playMusicStatus = {
            name: '',
            url: '',
            played: false,
            rangeValue: 0,
            volume: 50
          };
        }
      });
  }
  toMain(bool) {
    this.main = bool;
  }
  closeCreateSheetModal() {
    this.createSheetMessage = null;
  }
}
