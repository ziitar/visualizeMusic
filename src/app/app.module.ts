import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { Interceptor } from './service/interceptors';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'lyric/:id', component: LyricComponent},
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
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SongService,
    SearchService,
    SheetService,
    UserService,
    [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
