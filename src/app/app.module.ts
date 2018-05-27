import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MusicSheetComponent } from './music-sheet/music-sheet.component';
import { SheetService } from './service/sheet.service';
import { UserService } from './service/user.service';
import { SearchService } from './service/search.service';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { LyricComponent } from './lyric/lyric.component';
import { CommentComponent } from './comment/comment.component';
import { MainComponent } from './main/main.component';
import {SongService} from './service/song.service';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'lyric', component: LyricComponent},
  { path: 'comment', component: CommentComponent},
  { path: 'main', component: MainComponent},
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MusicSheetComponent,
    UserComponent,
    SearchComponent,
    LyricComponent,
    CommentComponent,
    MainComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    SongService,
    SearchService,
    SheetService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
