import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { ManageMovieComponent } from './components/manage-movie/manage-movie.component';
import { DetailMovieComponent } from './components/detail-movie/detail-movie.component';
import { MovieCardComponent } from './components/movies-list/components/movie-card/movie-card.component';
import { moviesRoutingModule } from '@movies/movies-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MoviesListComponent,
    ManageMovieComponent,
    DetailMovieComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    moviesRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class MoviesModule {}
