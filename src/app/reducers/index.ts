import * as fromRouter from '@ngrx/router-store';
import {Action, ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {InjectionToken} from '@angular/core';

import * as fromAuth from '../core/authentication/store/auth.reducer';
import {environment} from '../../environments/environment';

export interface State {
  auth: fromAuth.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDCUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token', {
  factory: () => ({
    auth: fromAuth.reducer,
    router: fromRouter.routerReducer
  })
});

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
