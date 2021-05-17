import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[notImage]',
})
export class NotImageDirective {
  constructor(private elementImg: ElementRef) {}

  @HostListener('error')
  onError(): void {
    this.elementImg.nativeElement.src = 'assets/images/no-image.png';
  }
}
