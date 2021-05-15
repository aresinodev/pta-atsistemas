import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
  }

  openMenu(): void {
    (this.document.querySelector('nav') as HTMLElement).style.width = '300px';
  }

  closeMenu(): void {
    (this.document.querySelector('nav') as HTMLElement).style.width = '0';
  }
}
