import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { State } from '../reducers/user.reducers';

export const getAuthState = (state: AppState) => state.auth;

export const selectToken = createSelector(getAuthState, (auth: State) => {
  return auth.token;
});

export const selectLogin = createSelector(getAuthState, (auth: State) => {
  return auth.login;
});

export const selectError = createSelector(getAuthState, (auth: State) => {
  return auth.errors;
});

export const selectLastChat = createSelector(getAuthState, (auth: State) => {
  return auth.lastChat;
});
