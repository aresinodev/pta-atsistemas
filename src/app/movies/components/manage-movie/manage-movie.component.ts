import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MoviesService } from '@services/movies.service';
import { Movie } from '../../../shared/models/movie.interface';
import { EMPTY, of } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actor } from '../../../shared/models/actor.interface';
import { ActorsService } from '@services/actors.service';
import { CompaniesService } from '@services/companies.service';

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.scss']
})
export class ManageMovieComponent implements OnInit {
  movie: Movie;
  movieForm: FormGroup;
  genresList: string[];
  selectedGenres: string[];
  selectedActors: Actor[];
  actors$ = this.actorsSvc.actors$;
  companies$ = this.companiesSvc.companies$;

  constructor(private headerSvc: HeaderService,
              private translateSvc: TranslateService,
              private route: ActivatedRoute,
              private moviesSvc: MoviesService,
              private formBuilder: FormBuilder,
              private actorsSvc: ActorsService,
              private companiesSvc: CompaniesService) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        const { id } = params;

        if (id) {
          return this.moviesSvc.getMovie(+id);
        }

        return of(null);
      })
    ).subscribe(
      (movie: Movie) => {
        if (movie) {
          this.movie = movie;
          this.headerSvc.setTitle(this.translateSvc.instant('manage-movie.edit'));
        } else {
          this.headerSvc.setTitle(this.translateSvc.instant('manage-movie.create'));
          this.movieForm = this.formBuilder.group({
            'title': new FormControl('', [Validators.required]),
            'poster': new FormControl('', [Validators.required]),
            'year': new FormControl('', [Validators.required]),
            'duration': new FormControl('', [Validators.required]),
            'rating': new FormControl('', [Validators.required]),
            'company': new FormControl(null, [Validators.required])
          });
        }
      }
    );
  }

  public addGenre(name: string): string {
    return name;
  }

  public save(): void {
    console.log('NOOOOO');
  }

  public update(): void {

  }

  public disableForm(): boolean {
    return this.movieForm.invalid || !this.selectedActors || !this.selectedGenres;
  }
}
