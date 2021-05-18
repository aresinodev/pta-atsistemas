import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  constructor() {}

  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }
}
