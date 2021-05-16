import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
              private router: Router) {
    this.router.events
    .subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          const { url } = event;
          console.log('Ruta: ', url);
          this.showBack = url !== '/movies';
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
}
