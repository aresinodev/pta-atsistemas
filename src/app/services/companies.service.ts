import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { find, mergeMap, tap } from 'rxjs/operators';

import { COMPANIES } from '../app.properties';
import { Company } from '../shared/models/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  companies$ = this.companiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCompaniesData();
  }

  private getCompaniesData(): void {
    this.http.get<Company[]>(COMPANIES)
      .pipe(
        tap((data: Company[]) => {
          this.companiesSubject.next(data)
        })
      )
      .subscribe();
  }

  public getCompany(id: number): Observable<Company> {
    // @ts-ignore
    return this.companies$
    .pipe(
      mergeMap((companies: Company[]) => companies),
      find((company: Company) => company?.id === id)
    );
  }
}
