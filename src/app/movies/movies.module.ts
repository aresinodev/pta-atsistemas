import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { ManageMovieComponent } from './components/manage-movie/manage-movie.component';
import { DetailMovieComponent } from './components/detail-movie/detail-movie.component';
import { MovieCardComponent } from './components/movies-list/components/movie-card/movie-card.component';
import { moviesRoutingModule } from '@movies/movies-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DeleteMovieComponent } from './components/detail-movie/components/delete-movie/delete-movie.component';

@NgModule({
  declarations: [
    MoviesListComponent,
    ManageMovieComponent,
    DetailMovieComponent,
    MovieCardComponent,
    DeleteMovieComponent
  ],
  imports: [
    CommonModule,
    moviesRoutingModule,
    TranslateModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ]
})
export class MoviesModule {}
