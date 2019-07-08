import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import * as fromAuth from '../authentication/store/auth.reducer';
import {selectAuthStatus} from '../authentication/store/auth.selector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.store.pipe(
      select(selectAuthStatus),
      take(1),
      map(status => {
        if (status.authenticated) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${status.token}`
            }
          });
        }
      })
    );
    return next.handle(req);
  }
}
