import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromAuth from '../authentication/store/auth.reducer';
import * as AuthAction from '../authentication/store/auth.action';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAuth.State>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.store.dispatch(AuthAction.logOut());
        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
