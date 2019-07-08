import {createSelector} from '@ngrx/store';

export const selectAuth = state => {
  console.log(state);
  return state;
};

export const selectAuthStatus = createSelector(
  selectAuth,
  state => state.auth
);

export const selectAuthAuthenticated = createSelector(
  selectAuthStatus,
  state => state.authenticated
);
