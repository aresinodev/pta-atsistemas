import { Injectable } from '@angular/core';

import { Actor } from '@shared/models/actor.interface';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  actors$ = this.dataSvc.actors$;

  constructor(private dataSvc: DataService) {}

  public getActorsByIds(ids: number[]): Actor[] {
    return this.dataSvc.getActorsByIds(ids);
  }
}
