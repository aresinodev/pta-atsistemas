import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MoviesListComponent } from '@movies/components/movies-list/movies-list.component';
import { ManageMovieComponent } from '@movies/components/manage-movie/manage-movie.component';
import { DetailMovieComponent } from '@movies/components/detail-movie/detail-movie.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'create', component: ManageMovieComponent },
  { path: 'edit/:id', component: ManageMovieComponent },
  { path: 'detail/:id', component: DetailMovieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class moviesRoutingModule {}
