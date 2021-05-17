import { Component, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { HeaderService } from '@services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title$ = this.headerSvc.title$;
  showBack = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private headerSvc: HeaderService,
              private router: Router,
              private _location: Location) {
    this.router.events
    .subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          const { urlAfterRedirects } = event;
          this.showBack = urlAfterRedirects !== '/movies';
        }
      }
    );
  }

  openMenu(): void {
    (this.document.querySelector('nav') as HTMLElement).style.width = '300px';
  }

  closeMenu(): void {
    (this.document.querySelector('nav') as HTMLElement).style.width = '0';
  }

  back(): void {
    this._location.back();
  }
}
