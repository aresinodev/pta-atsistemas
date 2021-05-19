import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { DetailMovieComponent } from './detail-movie.component';
import { TimeConverterPipe } from '@shared/pipes/time-converter.pipe';
import { MoviesService } from '@services/movies.service';
import { Movie } from '@shared/models/movie.interface';

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

describe('DetailMovieComponent', () => {
  let component: DetailMovieComponent;
  let fixture: ComponentFixture<DetailMovieComponent>;
  const activatedRouteData = {
    params: of(
      {
        id: 1
      }
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMovieComponent, TimeConverterPipe ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteData
        },
        {
          provide: MoviesService,
          useClass: MockMoviesService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
