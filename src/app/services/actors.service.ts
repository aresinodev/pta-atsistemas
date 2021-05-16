import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { find, mergeMap, tap } from 'rxjs/operators';

import { Actor } from '../shared/models/actor.interface';
import { ACTORS } from '../app.properties';

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
    this.http.get<Actor[]>(ACTORS)
    .pipe(
      tap((data: Actor[]) => {
        this.actorsSubject.next(data);
      })
    )
    .subscribe();
  }

  public getActor(id: number): Observable<Actor> {
    // @ts-ignore
    return this.actors$
      .pipe(
        mergeMap((actors: Actor[]) => actors),
        find((actor: Actor) => actor?.id === id)
      );
  }
}
