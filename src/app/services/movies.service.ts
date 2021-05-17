import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { find, mergeMap, tap } from 'rxjs/operators';

import { MOVIES } from '../app.properties';
import { Movie } from '../shared/models/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesSubject = new BehaviorSubject<Movie[]>(null);
  movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getMoviesData();
  }

  private getMoviesData(): void {
    this.http.get<Movie[]>(MOVIES)
    .pipe(
      tap((data: Movie[]) => {
        this.moviesSubject.next(data);
      })
    )
    .subscribe();
  }

  public getMovie(id: number): Observable<Movie> {
    // @ts-ignore
    return this.movies$
    .pipe(
      mergeMap((movies: Movie[]) => movies),
      find((movie: Movie) => movie?.id === id)
    );
  }
}
