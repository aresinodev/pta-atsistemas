import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { NotImageDirective } from './directives/not-image.directive';
import { TimeConverterPipe } from './pipes/time-converter.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    HeaderComponent,
    NotImageDirective,
    TimeConverterPipe
  ],
  exports: [
    SpinnerComponent,
    HeaderComponent,
    NotImageDirective,
    TimeConverterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ]
})
export class SharedModule { }
