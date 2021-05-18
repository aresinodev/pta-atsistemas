import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { find, map, mergeMap, tap } from 'rxjs/operators';

import { Actor } from '../shared/models/actor.interface';
import { ACTORS } from '../app.properties';

type ActorDb = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  bornCity: string;
  birthdate: string;
  img: string;
  rating: number;
  movies: number[];
};

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private actorsSubject = new BehaviorSubject<Actor[]>([]);
  actors$ = this.actorsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getActorsData();
  }

  private getActorsData(): void {
    this.http.get<ActorDb[]>(ACTORS)
    .pipe(
      tap((data: ActorDb[]) => {
        const actors: Actor[] = data.map((actorDb: ActorDb) => ({
          id: actorDb.id,
          name: `${ actorDb?.first_name } ${ actorDb?.last_name }`,
          gender: actorDb.gender,
          bornCity: actorDb.bornCity,
          birthdate: actorDb.birthdate,
          img: actorDb.img,
          rating: actorDb.rating,
          movies: actorDb.movies
        }));
        this.actorsSubject.next(actors);
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
