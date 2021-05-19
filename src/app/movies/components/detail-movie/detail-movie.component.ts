import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { Actor } from '@shared/models/actor.interface';
import { Company } from '@shared/models/company.interface';
import { CompaniesService } from '@services/companies.service';
import { ActorsService } from '@services/actors.service';
import { SpinnerService } from '@services/spinner.service';
import { MoviesService } from '@services/movies.service';
import { Movie } from '@shared/models/movie.interface';
import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html'
})
export class DetailMovieComponent implements OnInit {
  movie: Movie;
  actors: Actor[];
  companies: Company[];
  deleteMovie = false;

  constructor(private route: ActivatedRoute,
              private moviesSvc: MoviesService,
              private headerSvc: HeaderService,
              private companiesSvc: CompaniesService,
              private actorsSvc: ActorsService,
              private spinnerSvc: SpinnerService,
              @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.spinnerSvc.show();

    this.document.querySelector('body').scroll(0, 0);
    this.route.params
    .pipe(
      switchMap((params) => {
        const { id } = params;
        return combineLatest([this.moviesSvc.getMovie(+id),
        this.actorsSvc.getActorsByMovie(+id), this.companiesSvc.getCompaniesByMovie(+id)])
      })
    )
    .subscribe(
      (data) => {
        const [ movie, actors, companies ] = data;
        this.movie = movie;
        this.headerSvc.setTitle(`${ movie.title } (${ movie.year })`);
        this.actors = actors;
        this.companies = companies;

        this.spinnerSvc.hide();
      }
    );
  }
}
