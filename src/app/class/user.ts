import {Sheet } from './sheet';

export class User {
  _id: string;
  userName: string;
  headUrl: string;
  email: string;
  sex: string;
  sheets: Sheet[];
  loveSheets: Sheet[];
}
