import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate'),
    url: '/movies/create'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        ToastrModule.forRoot()
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
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Click on the add movie button', () => {
    const routerSvc = TestBed.get(Router);

    const addMovieBtn = fixture.debugElement.query(By.css('.add-movie'));
    addMovieBtn.triggerEventHandler('click', {});

    expect(routerSvc.navigate).toHaveBeenCalledWith(['/movies/create']);
  });
});
