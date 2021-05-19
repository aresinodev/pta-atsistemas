import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';


import { ACTORS, COMPANIES, MOVIES } from '../app.properties';
import { Movie } from '@shared/models/movie.interface';
import { Actor } from '@shared/models/actor.interface';
import { Company } from '@shared/models/company.interface';

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
export class DataService {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private actorsSubject = new BehaviorSubject<Actor[]>([]);
  private companiesSubject = new BehaviorSubject<Company[]>([]);

  movies$ = this.moviesSubject.asObservable();
  actors$ = this.actorsSubject.asObservable();
  companies$ = this.companiesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getDataAPI();
  }

  private getDataAPI(): void {
    forkJoin([this.getMovies(), this.getActors(), this.getCompanies()])
    .subscribe((data) => {
      const [ movies, actors, companies ] = data;

      this.moviesSubject.next(movies);
      this.companiesSubject.next(companies);
      this.actorsSubject.next(this.parseActorDbToActor(actors));
    })
  }

  private getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(MOVIES);
  }

  private getActors(): Observable<ActorDb[]> {
    return this.http.get<ActorDb[]>(ACTORS);
  }

  private getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(COMPANIES);
  }

  private parseActorDbToActor(actors: ActorDb[]): Actor[] {
    return actors.map((actorDb: ActorDb) => ({
      id: actorDb.id,
      name: `${ actorDb?.first_name } ${ actorDb?.last_name }`,
      gender: actorDb.gender,
      bornCity: actorDb.bornCity,
      birthdate: actorDb.birthdate,
      img: actorDb.img,
      rating: actorDb.rating,
      movies: actorDb.movies
    }));
  }

  public deleteMovie(id: number): void {
    const movies = this.moviesSubject.getValue();
    const newArrMovies = movies.filter((item: Movie) => item.id !== id);

    this.moviesSubject.next([...newArrMovies]);
  }

  public addMovie(movie: Movie): void {
    const movies = this.moviesSubject.getValue();
    const newArrMovies = [...movies, movie];

    this.moviesSubject.next([...newArrMovies]);
  }

  public updateMovie(movie: Movie): void {
    const movies = this.moviesSubject.getValue();
    const indexInArray = movies.findIndex((item: Movie) => item.id === movie.id);
    movies[indexInArray] = movie;

    this.moviesSubject.next([...movies]);
  }

  public getActorsByMovie(id: number): Actor[] {
    return this.actorsSubject.getValue().filter((actor: Actor) => actor.movies.includes(id));
  }

  public getCompanyByMovie(id: number): Company[] {
    return this.companiesSubject.getValue().filter((company: Company) => company.movies.includes(id));
  }
}
