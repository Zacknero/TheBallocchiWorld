import {createAction, props} from '@ngrx/store';
import {Credentials} from '../../models/user';

export const trySignIn = createAction(
  '[AUTH] Try Sign In',
  props<{ credentials: Credentials }>()
);

export const signIn = createAction('[AUTH] Sign In');

export const logOut = createAction('[AUTH] Log Out');

export const setToken = createAction(
  '[AUTH] Set Token',
  props<{ token: string }>()
);

export const loginRedirect = createAction('[AUTH] Login Redirect');
