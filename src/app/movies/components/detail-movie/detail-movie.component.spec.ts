import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMovieComponent } from './detail-movie.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { TimeConverterPipe } from '@shared/pipes/time-converter.pipe';
import { of } from 'rxjs';

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
