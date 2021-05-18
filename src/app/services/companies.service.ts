import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Company } from '@shared/models/company.interface';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  companies$ = this.dataSvc.companies$;

  constructor(private dataSvc: DataService) {}

  /*public getCompany(id: number): Company {
    return this.companiesSubject.getValue().find((company) => company.id === id);
  }*/

  public getCompaniesByMovie(movieId: number): Observable<Company[]> {
    return this.companies$
    .pipe(
      map((companies: Company[]) => companies?.filter((company: Company) => company?.movies.includes(movieId)))
    );
  }
}
