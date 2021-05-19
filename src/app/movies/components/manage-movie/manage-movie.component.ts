import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HeaderService } from '@services/header.service';
import { MoviesService } from '@services/movies.service';
import { Movie } from '@shared/models/movie.interface';
import { Actor } from '@shared/models/actor.interface';
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
  submitted = false;

  get formControls() {
    return this.movieForm.controls;
  }

  constructor(private headerSvc: HeaderService,
              private translateSvc: TranslateService,
              private route: ActivatedRoute,
              private moviesSvc: MoviesService,
              private formBuilder: FormBuilder,
              private actorsSvc: ActorsService,
              private companiesSvc: CompaniesService,
              private router: Router) {}

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
      async (movie: Movie) => {
        this.movieForm = this.formBuilder.group({
          'title': new FormControl('', [Validators.required]),
          'poster': new FormControl('', [Validators.required]),
          'year': new FormControl('', [Validators.required]),
          'duration': new FormControl('', [Validators.required]),
          'rating': new FormControl('', [Validators.required]),
          'company': new FormControl(null, [Validators.required])
        });

        if (movie) {
          this.movie = movie;
          this.headerSvc.setTitle(this.translateSvc.instant('manage-movie.edit'));
          this.fillForm();
        } else {
          this.headerSvc.setTitle(this.translateSvc.instant('manage-movie.create'));
        }
      }
    );
  }

  public addGenre(name: string): string {
    return name;
  }

  public save(): void {
    this.submitted = true;

    const movie: Partial<Movie> = {
      title: this.formControls.title.value,
      poster: this.formControls.poster.value,
      genre: this.selectedGenres,
      year: +this.formControls.year.value,
      imdbRating: +this.formControls.rating.value,
      actors: this.selectedActors.map((actor: Actor) => actor.id),
      duration: +this.formControls.duration.value,
      company: +this.formControls.company.value
    };

    this.moviesSvc.create(movie)
    .subscribe(
      (item: Movie) => {
        this.submitted = false;
        this.moviesSvc.addMovieStore(item);
        this.router.navigate(['/movies']);
      }
    );
  }

  public update(): void {
    this.submitted = true;

    const movie: Movie = {
      id: this.movie.id,
      title: this.formControls.title.value,
      poster: this.formControls.poster.value,
      genre: this.selectedGenres,
      year: +this.formControls.year.value,
      imdbRating: +this.formControls.rating.value,
      actors: this.selectedActors.map((actor: Actor) => actor.id),
      duration: +this.formControls.duration.value,
      company: +this.formControls.company.value
    };

    this.moviesSvc.update(movie)
      .subscribe(
        (item: Movie) => {
          this.submitted = false;
          this.moviesSvc.updateMovieStore(item);
          this.router.navigate(['/movies']);
        }
      );
  }

  public disableForm(): boolean {
    return this.movieForm.invalid || (!this.selectedActors ||
    (this.selectedActors && this.selectedActors.length === 0)) ||
    (!this.selectedGenres || (this.selectedGenres && this.selectedGenres.length === 0))
  }

  private fillForm(): void {
    if (this.movie) {
      this.selectedActors = this.actorsSvc.actorsByMovie(this.movie.id);
      this.selectedGenres = this.movie.genre;
      const [ company ] = this.companiesSvc.companiesByMovie(this.movie.id);

      this.formControls.title.setValue(this.movie.title);
      this.formControls.poster.setValue(this.movie.poster);
      this.formControls.year.setValue(this.movie.year);
      this.formControls.duration.setValue(this.movie.duration);
      this.formControls.rating.setValue(this.movie.imdbRating);
      this.formControls.company.setValue(company.id);
    }
  }
}
