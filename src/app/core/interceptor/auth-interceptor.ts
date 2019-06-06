import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromAuth from '../authentication/store/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.store.select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => {
          if (authState.authenticated) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${authState.token}`
              }
            });
          }
        })
      );
    return next.handle(req);
  }
}
