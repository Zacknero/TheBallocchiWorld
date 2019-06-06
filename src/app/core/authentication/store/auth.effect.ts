import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap, tap, mergeMap} from 'rxjs/operators';
import * as firebase from 'firebase';

import * as AuthAction from '../../authentication/store/auth.action';
import {Credentials} from '../../models/user';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffect {
  @Effect()
  authSignin = this.action$.pipe(
    ofType(AuthAction.TRY_SIGNIN),
    map((action: AuthAction.TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: Credentials) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    }),
    switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthAction.SIGNIN
        },
        {
          type: AuthAction.SET_TOKEN,
          payload: token
        }
      ];
    }),
    tap(() => {
      this.router.navigate(['home']);
    })
  );

  @Effect({dispatch: false})
  authLogout = this.action$.pipe(
    ofType(AuthAction.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private action$: Actions, private router: Router) {
  }
}
