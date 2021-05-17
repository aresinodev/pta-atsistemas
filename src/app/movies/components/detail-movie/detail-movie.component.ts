import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '@services/movies.service';
import { Movie } from '../../../shared/models/movie.interface';
import { HeaderService } from '@services/header.service';
import { elementAt, switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Actor } from '../../../shared/models/actor.interface';
import { Company } from '../../../shared/models/company.interface';
import { CompaniesService } from '@services/companies.service';
import { ActorsService } from '@services/actors.service';
import { SpinnerService } from '@services/spinner.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss']
})
export class DetailMovieComponent implements OnInit {
  movie: Movie;
  actors: Actor[];
  companies: Company[];

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
      }),
      elementAt(2)
    )
    .subscribe(
      (data) => {
        // console.log('DATA', data);
        const [ movie, actors, companies ] = data;
        this.movie = movie;
        this.headerSvc.setTitle(`${ movie.title } (${ movie.year })`);
        this.actors = actors;
        this.companies = companies;

        // console.log('MOVIE', movie);
        // console.log('ACTORS', actors);
        // console.log('COMPANIES', companies);

        this.spinnerSvc.hide();
      }
    );
  }
}
