import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { EMPTY, of } from 'rxjs';

import { DeleteMovieComponent } from './delete-movie.component';
import { MoviesService } from '@services/movies.service';

describe('DeleteMovieComponent', () => {
  let component: DeleteMovieComponent;
  let fixture: ComponentFixture<DeleteMovieComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
    url: '/movies'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMovieComponent ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: router
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMovieComponent);
    component = fixture.componentInstance;
    component.movie = {
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
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click button delete', () => {
    const moviesSvc = TestBed.get(MoviesService);
    const routerSvc = TestBed.get(Router);
    const spyOnDelete = spyOn(moviesSvc, 'delete').and.returnValue(of(EMPTY));
    const spyOnDeleteStore = spyOn(moviesSvc, 'deleteMovieStore');
    spyOn(component.close, 'emit');

    const deleteBtn = fixture.debugElement.query(By.css('.btn-delete'));
    deleteBtn.triggerEventHandler('click', {});

    expect(component.close.emit).toHaveBeenCalled();
    expect(spyOnDelete).toHaveBeenCalledWith(8);
    expect(spyOnDeleteStore).toHaveBeenCalledOnceWith(8);
    expect(routerSvc.navigate).toHaveBeenCalledWith(['/movies']);
  });
});
