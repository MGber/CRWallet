import * as All from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  token?: string;
  login?: string;
  errors?: string;
  lastChat?: string;
}

export const initialState: State = {
  token: undefined,
  errors: undefined,
  login: undefined,
  lastChat: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(All.SetLogin, (state, action) => {
    return {
      ...state,
      token: action.token,
      login: action.login
    };
  }),
  on(All.SetLoginErrors, (state, action) => {
    return {
      ...state,
      errors: action.errors,
    };
  }),
  on(All.SetLastChat, (state, action) => {
    return {
      ...state,
      lastChat: action.lastChat,
    };
  }),
);
