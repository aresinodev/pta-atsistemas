import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { HeaderService } from '@services/header.service';
import { MoviesService } from '@services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies$ = this.moviesSvc.movies$;

  constructor(private headerSvc: HeaderService,
              private translateSvc: TranslateService,
              private moviesSvc: MoviesService,
              private router: Router) {}

  ngOnInit(): void {
    this.headerSvc.setTitle(this.translateSvc.instant('header.movies-list.title'));
  }

  goToCreateMovie(): void {
    this.router.navigate(['/movies/create']);
  }
}
