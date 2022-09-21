import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { LoggedUser } from 'src/app/models/viewmodels/logged-user';
import { LoginUserViewModel } from 'src/app/models/viewmodels/login-user-view-model';

export const Login = createAction('[Auth] Login',props<LoginUserViewModel>());
export const LoginWith = createAction('[Auth] Login With Google',props<User>());
export const Logout = createAction('[Auth] Logout');
export const AutoLogin = createAction('[Auth] Auto Login',props<{ token: string }>());
export const Register = createAction('[Auth] Register',props<User>());
export const SetLogin = createAction('[Auth] Login Success',props<LoggedUser>());
export const SetLoginErrors = createAction('[Auth] Login Failure',props<{ errors: any }>());
export const ClearErrors = createAction('[Auth] Clear Errors');
export const LastChat = createAction('[Auth] Last Chat',props<{ lastChat: string }>());
export const SetLastChat = createAction('[Auth] Last Chat Success',props<{ lastChat: string }>());
