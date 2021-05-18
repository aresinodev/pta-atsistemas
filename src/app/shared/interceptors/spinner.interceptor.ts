import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { SpinnerService } from '@services/spinner.service';


@Injectable({
  providedIn: 'root',
})
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerSvc: SpinnerService,
              private toastrSvc: ToastrService,
              private translateSvc: TranslateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerSvc.show();

    return next.handle(req)
    .pipe(
      finalize(() => this.spinnerSvc.hide()),
      catchError((error) => {
        console.error(error);
        this.toastrSvc.error(this.translateSvc.instant('errors.server-error'), this.translateSvc.instant('errors.title'));
        return throwError(error.message);
      })
    );
  }
}
