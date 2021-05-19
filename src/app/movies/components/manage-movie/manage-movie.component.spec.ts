import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

import { ManageMovieComponent } from './manage-movie.component';
import { MoviesService } from '@services/movies.service';
import { Movie } from '@shared/models/movie.interface';
import { HeaderService } from '@services/header.service';

class MockMoviesService extends MoviesService {
  public getMovie(id: number): Observable<Movie> {
    return of({
      "id": 8,
      "title": "Godzilla vs. Mechagodzilla II",
      "poster": null,
      "genre": [
        "Action",
        "Drama",
        "Sci-Fi"
      ],
      "year": 1993,
      "duration": 121,
      "imdbRating": 5.36,
      "actors": [
        3,
        4,
        5
      ],
      "company": 4
    });
  }
}

describe('ManageMovieComponent', () => {
  let component: ManageMovieComponent;
  let fixture: ComponentFixture<ManageMovieComponent>;
  const activatedRouteData = {
    params: of({
      id: 1
    })
  };
  const router = {
    navigate: jasmine.createSpy('navigate'),
    url: '/movies'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMovieComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteData,
        },
        {
          provide: Router,
          useValue: router
        },
        {
          provide: MoviesService,
          useClass: MockMoviesService
        },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMovieComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('ngOnInit without route params', () => {
    component.route.params = of({});
    const headerSvc = TestBed.get(HeaderService);
    const spyOnSetTitle = spyOn(headerSvc, 'setTitle');

    component.ngOnInit();

    expect(spyOnSetTitle).toHaveBeenCalledWith('manage-movie.create');
  });
});
