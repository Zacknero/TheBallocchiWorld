import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap, tap} from 'rxjs/operators';
import * as firebase from 'firebase';

import * as AuthAction from '../../authentication/store/auth.action';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffect {

  authSignin$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthAction.trySignIn),
      map((action) => {
        const authData = action.credentials;
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }),
      map(value =>
        value ? AuthAction.signIn() : AuthAction.loginRedirect()
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthAction.signIn),
        switchMap(() => {
          return fromPromise(firebase.auth().currentUser.getIdToken());
        }),
        map(value => AuthAction.setToken({token: value})),
        tap(() => this.router.navigate(['home']))
      )
  );

  loginRedirect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthAction.loginRedirect),
        tap(_ => {
          this.router.navigate(['/login']);
        })
      ),
    {dispatch: false}
  );

  authLogout$ = createEffect(() =>
      this.action$.pipe(
        ofType(AuthAction.logOut),
        map(() => this.router.navigate(['/']))
      ),
    {dispatch: false}
  );

  constructor(private action$: Actions, private router: Router) {
  }
}
