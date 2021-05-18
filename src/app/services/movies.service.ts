import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { find, mergeMap } from 'rxjs/operators';

import { Movie } from '@shared/models/movie.interface';
import { DataService } from '@services/data.service';
import { HttpClient } from '@angular/common/http';
import { MOVIES } from '../app.properties';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies$ = this.dataSvc.movies$;

  constructor(private dataSvc: DataService,
              private http: HttpClient) {}

  public getMovie(id: number): Observable<Movie> {
    // @ts-ignore
    return this.movies$
    .pipe(
      mergeMap((movies: Movie[]) => movies),
      find((movie: Movie) => movie?.id === id)
    );
  }

  public delete(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${ MOVIES }/${ id }`);
  }

  public deleteMovieStore(id: number): void {
    this.dataSvc.deleteMovie(id);
  }
}
