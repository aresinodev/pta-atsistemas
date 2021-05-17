import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, find, map, mergeMap, tap } from 'rxjs/operators';

import { Actor } from '../shared/models/actor.interface';
import { ACTORS } from '../app.properties';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private actorsSubject = new BehaviorSubject<Actor[]>(null);
  actors$ = this.actorsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getActorsData();
  }

  private getActorsData(): void {
    this.http.get<Actor[]>(ACTORS)
    .pipe(
      tap((data: Actor[]) => {
        this.actorsSubject.next(data);
      })
    )
    .subscribe();
  }

  /*public getActorsByMovie(movieId: number): Actor[] {
    console.log('ACTORS', this.actorsSubject.getValue());
    return this.actorsSubject.getValue().filter((actor) => actor.movies.includes(movieId));
  }*/

  public getActor(id: number): Observable<Actor> {
    return this.actors$
      .pipe(
        mergeMap((actors: Actor[]) => actors),
        find((actor: Actor) => actor?.id === id)
      );
  }

  public getActorsByMovie(movieId: number): Observable<Actor[]> {
    return this.actors$
    .pipe(
      map((actors: Actor[]) => actors?.filter((actor: Actor) => actor?.movies.includes(movieId)))
    );
  }
}
