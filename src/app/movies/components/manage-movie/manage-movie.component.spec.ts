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
import { Actor } from '@shared/models/actor.interface';
import { Company } from '@shared/models/company.interface';

class MockMoviesService extends MoviesService {
  public getMovie(id: number): Observable<Movie> {
    return of({
      'id': 8,
      'title': 'Godzilla vs. Mechagodzilla II',
      'poster': null,
      'genre': [
        'Action',
        'Drama',
        'Sci-Fi'
      ],
      'year': 1993,
      'duration': 121,
      'imdbRating': 5.36,
      'actors': [
        3,
        4,
        5
      ],
      'company': 4
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
  const actors: Actor[] = [
    {
      'id': 1,
      'name': 'Isaak McQuode',
      'gender': 'Male',
      'bornCity': 'Ciduren',
      'birthdate': '24/12/1957',
      'img': 'http://dummyimage.com/600x400.png/dddddd/000000',
      'rating': 2.03,
      'movies': [
        3,
        7
      ]
    },
    {
      'id': 2,
      'name': 'Rory Chanders',
      'gender': 'Male',
      'bornCity': 'Cijengkol',
      'birthdate': '19/04/1975',
      'img': 'http://dummyimage.com/600x400.png/5fa2dd/000000',
      'rating': 2.43,
      'movies': []
    },
    {
      'id': 3,
      'name': 'Lew Meehan',
      'gender': 'Male',
      'bornCity': 'Łanięta',
      'birthdate': '10/04/1986',
      'img': null,
      'rating': 7.92,
      'movies': [
        6,
        7,
        8
      ]
    }
  ];
  const companies: Company[] = [
    {
      'id': 1,
      'name': 'Jacobson-Dickinson',
      'country': 'Colombia',
      'createYear': 2010,
      'employees': 81,
      'rating': 4.32,
      'movies': [
        1,
        10
      ]
    },
    {
      'id': 2,
      'name': 'Quitzon-Erdman',
      'country': 'China',
      'createYear': 2005,
      'employees': 611,
      'rating': 8.19,
      'movies': [
        2,
        3,
        4
      ]
    },
    {
      'id': 3,
      'name': 'Hane, Metz and Morar',
      'country': 'Greece',
      'createYear': 1994,
      'employees': 511,
      'rating': 8.09,
      'movies': [
        5,
        6,
        7
      ]
    },
    {
      'id': 4,
      'name': 'Baumbach-Maggio',
      'country': 'Philippines',
      'createYear': 2005,
      'employees': 42,
      'rating': 9.26,
      'movies': [
        8,
        9
      ]
    },
    {
      'id': 5,
      'name': 'Kub, Kertzmann and Sanford',
      'country': 'China',
      'createYear': 1999,
      'employees': 921,
      'rating': 1.77,
      'movies': [
        11
      ]
    }
  ];

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

    component.actors$ = of(actors);
    component.companies$ = of(companies);

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

  it('Save movie', () => {
    component.movie = null;
    const routerSvc = TestBed.get(Router);
    const moviesSvc = TestBed.get(MoviesService);
    const response = {
      id: 12,
      title: 'La naranja mecánica',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_UX182_CR0,0,182,268_AL_.jpg',
      genre: ['Crime', 'Drama', 'Sci-fi'],
      year: 1971,
      imdbRating: 8.3,
      duration: 136,
      company: 1,
      actors: [1, 2]
    };

    const spyCreateMovie = spyOn(moviesSvc, 'create').and.returnValue(of(response));
    spyOn(moviesSvc, 'addMovieStore');

    component.selectedActors = [
      {
        'id': 1,
        'name': 'Isaak McQuode',
        'gender': 'Male',
        'bornCity': 'Ciduren',
        'birthdate': '24/12/1957',
        'img': 'http://dummyimage.com/600x400.png/dddddd/000000',
        'rating': 2.03,
        'movies': [
          3,
          7
        ]
      },
      {
        'id': 2,
        'name': 'Rory Chanders',
        'gender': 'Male',
        'bornCity': 'Cijengkol',
        'birthdate': '19/04/1975',
        'img': 'http://dummyimage.com/600x400.png/5fa2dd/000000',
        'rating': 2.43,
        'movies': []
      }
    ];
    component.selectedGenres = ['Crime', 'Drama', 'Sci-fi'];

    component.movieForm.controls.title.setValue('La naranja mecánica');
    component.movieForm.controls.poster.setValue('https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_UX182_CR0,0,182,268_AL_.jpg');
    component.movieForm.controls.year.setValue(1971);
    component.movieForm.controls.duration.setValue(136);
    component.movieForm.controls.rating.setValue(8.3);
    component.movieForm.controls.company.setValue(1);

    fixture.detectChanges();

    component.save();

    expect(spyCreateMovie).toHaveBeenCalledTimes(1);
    expect(component.submitted).toBeFalsy();
    expect(moviesSvc.addMovieStore).toHaveBeenCalledWith(response);
    expect(routerSvc.navigate).toHaveBeenCalledWith(['/movies']);
  });

  it('Update movie', () => {
    component.movie = {
      'id': 8,
      'title': 'Godzilla vs. Mechagodzilla II',
      'poster': null,
      'genre': [
        'Action',
        'Drama',
        'Sci-Fi'
      ],
      'year': 1993,
      'duration': 121,
      'imdbRating': 5.36,
      'actors': [
        3,
        4,
        5
      ],
      'company': 4
    };
    const routerSvc = TestBed.get(Router);
    const moviesSvc = TestBed.get(MoviesService);
    const response = {
      'id': 8,
      'title': 'Toy Story',
      'poster': 'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg',
      'genre': [
        'Animation',
        'Adventure',
        'Comedy',
        'Family',
        'Fantasy'
      ],
      'year': 1995,
      'duration': 81,
      'imdbRating': 8.3,
      'actors': [
        5
      ],
      'company': 1
    };
    const spyUpdateMovie = spyOn(moviesSvc, 'update').and.returnValue(of(response));
    spyOn(moviesSvc, 'updateMovieStore');

    component.selectedActors = [
      {
        "id": 5,
        "name": "Jordan Yeskov",
        "gender": "Male",
        "bornCity": "Gouqi",
        "birthdate": "30/12/1990",
        "img": "https://dummyimage.com/600x400.png/2f125d/ffffff",
        "rating": 3.92,
        "movies": [
          1,
          2,
          6,
          7,
          8
        ]
      }
    ];
    component.selectedGenres = [
      'Animation',
      'Adventure',
      'Comedy',
      'Family',
      'Fantasy'
    ];

    component.movieForm.controls.title.setValue('Toy Story');
    component.movieForm.controls.poster.setValue('https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_UX182_CR0,0,182,268_AL_.jpg');
    component.movieForm.controls.year.setValue(1995);
    component.movieForm.controls.duration.setValue(81);
    component.movieForm.controls.rating.setValue(8.3);
    component.movieForm.controls.company.setValue(1);

    fixture.detectChanges();

    component.update();

    expect(spyUpdateMovie).toHaveBeenCalledTimes(1);
    expect(component.submitted).toBeFalsy();
    expect(moviesSvc.updateMovieStore).toHaveBeenCalledWith(response);
    expect(routerSvc.navigate).toHaveBeenCalledWith(['/movies']);
  });
});
