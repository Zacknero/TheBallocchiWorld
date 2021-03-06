import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../authentication/authentication.service';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authenticationService.isLogged
      .pipe(
        take(1),
        map((isLogged: boolean) => {
          if (isLogged) {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${this.authenticationService.token()}`
              }
            });
          }
        })
      );
    return next.handle(req);
  }
}
