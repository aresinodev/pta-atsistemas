import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const routerMockData = {
    events: of(new NavigationEnd(1, '/movies/create', '/movies/detail/1'))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: Router,
          useValue: routerMockData
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('go back', () => {
    const location = TestBed.get(Location);
    spyOn(location, 'back');

    const btnBack = fixture.debugElement.query(By.css('.arrow-back__image'));
    btnBack.triggerEventHandler('click', {});

    expect(location.back).toHaveBeenCalled();
  });

  it('openMenu', () => {
    component.showBack = false;

    fixture.detectChanges();

    const navElement = fixture.debugElement.query(By.css('.menu'));
    const menuBtn = fixture.debugElement.query(By.css('.hamburger'));
    menuBtn.triggerEventHandler('click', {});

    expect(navElement.styles.width).toBe('300px');
  });

  it('closeMenu', () => {
    component.showBack = false;

    fixture.detectChanges();

    const menuBtn = fixture.debugElement.query(By.css('.hamburger'));
    menuBtn.triggerEventHandler('click', {});

    const navElement = fixture.debugElement.query(By.css('.menu'));

    const closeMenuBtn = fixture.debugElement.query(By.css('.menu__title--close'));
    closeMenuBtn.triggerEventHandler('click', {});

    expect(navElement.styles.width).toBe('0px');
  });
});
