import {Song } from './song';

export class Sheet {
  _id: string;
  sheetName: string;
  like: number;
  songNum: number;
  orderUser: string[];
  songs: Song[];
  createTime: any;
  updateTime: any;
}
