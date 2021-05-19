import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMovieComponent } from './manage-movie.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

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
});
