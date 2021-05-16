import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  constructor(private headerSvc: HeaderService,
              private translateSvc: TranslateService) {}

  ngOnInit(): void {
    console.log('Movies list');
    this.headerSvc.setTitle(this.translateSvc.instant('header.movies-list.title'));
  }
}
