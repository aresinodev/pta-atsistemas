import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@services/header.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.scss']
})
export class ManageMovieComponent implements OnInit {

  constructor(private headerSvc: HeaderService,
              private translateSvc: TranslateService) {}

  ngOnInit(): void {
    this.headerSvc.setTitle(this.translateSvc.instant('header.manage-movie.create-title'));
  }
}
