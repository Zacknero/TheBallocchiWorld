import * as AuthAction from './auth.action';
import {createReducer, on} from '@ngrx/store';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export const reducer = createReducer(
  initialState,
  on(AuthAction.signIn,
    state => ({
      ...state,
      authenticated: true
    })
  ),
  on(AuthAction.logOut,
    state => ({
      ...state,
      token: null,
      authenticated: false
    })
  ),
  on(AuthAction.setToken,
    (state, {token}) => ({
      ...state,
      token: token
    }))
);
