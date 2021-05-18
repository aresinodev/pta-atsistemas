import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { find, map, mergeMap } from 'rxjs/operators';

import { Actor } from '@shared/models/actor.interface';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  actors$ = this.dataSvc.actors$;

  constructor(private dataSvc: DataService) {}

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

  public actorsByMovie(id: number): Actor[] {
    return this.dataSvc.getActorsByMovie(id);
  }
}
