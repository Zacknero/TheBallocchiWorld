import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import {State} from '../../reducers';
import {selectAuthAuthenticated} from './store/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<State>) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectAuthAuthenticated),
      take(1),
      map(authed => {
        if (!authed) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }

}
