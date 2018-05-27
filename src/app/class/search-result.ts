
class Artist {
  id: number;
  name: string;
  picUrl: any;
  alia: any[];
  albumSize: number;
  picId: number;
  img1v1Url: string;
  img1v1: number;
  trans: any;
}
class Album {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
}
export class SearchResult {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: string;
  copyrightId: number;
  status: number;
  alias: any[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl: any;
}
