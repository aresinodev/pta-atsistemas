import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { slideInAnimation } from './utils/animation';
import { fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]

})
export class AppComponent {
  constructor(private translate: TranslateService,
              @Inject(DOCUMENT) private document: Document) {
    translate.setDefaultLang('es');
    fromEvent(this.document, 'click')
    .subscribe(
      (event: Event) => {
        const isNavMenu = (event.target as HTMLElement).classList.toString().includes('menu');
        if (!isNavMenu && this.document.querySelector('.menu').clientWidth === 300) {
          (this.document.querySelector('.menu') as HTMLElement).style.width = '0';
        }
      }
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
