import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, find, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Movie } from '@shared/models/movie.interface';
import { DataService } from '@services/data.service';
import { MOVIES } from '../app.properties';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies$ = this.dataSvc.movies$;

  constructor(private dataSvc: DataService,
              private http: HttpClient,
              private toastrSvc: ToastrService,
              private translateSvc: TranslateService) {}

  public getMovie(id: number): Observable<Movie> {
    return this.movies$
    .pipe(
      mergeMap((movies: Movie[]) => movies),
      find((movie: Movie) => movie?.id === id),
      delay(50)
    );
  }

  public create(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(`${ MOVIES }`, movie);
  }

  public delete(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${ MOVIES }/${ id }`);
  }

  public update(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${ MOVIES }/${ movie.id }`, movie);
  }

  public deleteMovieStore(id: number): void {
    this.toastrSvc.success(this.translateSvc.instant('film-deleted'));
    this.dataSvc.deleteMovie(id);
  }

  public addMovieStore(movie: Movie): void {
    this.toastrSvc.success(this.translateSvc.instant('film-added'));
    this.dataSvc.addMovie(movie);
  }

  public updateMovieStore(movie: Movie): void {
    this.toastrSvc.success(this.translateSvc.instant('film-updated'));
    this.dataSvc.updateMovie(movie);
  }
}
