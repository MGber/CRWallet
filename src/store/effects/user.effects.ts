import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as authActions from '../actions/user.actions';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { LoginUserViewModel } from 'src/app/models/viewmodels/login-user-view-model';
import { LoggedUser } from 'src/app/models/viewmodels/logged-user';
import { User } from 'src/app/models/user';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.Login),
      exhaustMap((user: LoginUserViewModel) => {
        return this.userService.login(user).pipe(
          map((connectedUser: LoggedUser) => {
            let token = connectedUser.token as string;
            localStorage.setItem('token', token);
            return authActions.SetLogin(connectedUser);
          }),
          catchError((error) => {
            let errorMessage = 'Invalid username or password !';
            if (error.status >= 500 && error.status < 600) {
              errorMessage = 'Something went wrong !';
            }
            return of(authActions.SetLoginErrors({ errors: errorMessage }));
          })
        );
      })
    )
  );

  loginWith$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LoginWith),
      exhaustMap((user: LoginUserViewModel) => {
        return this.userService.loginWithOtherServices(user).pipe(
          map((connectedUser: LoggedUser) => {
            let token = connectedUser.token as string;
            localStorage.setItem('token', token);
            return authActions.SetLogin(connectedUser);
          }),
          catchError((error) => {
            let errorMessage = 'Invalid username or password !';
            if (error.status >= 500 && error.status < 600) {
              errorMessage = 'Something went wrong !';
            }
            return of(authActions.SetLoginErrors({ errors: errorMessage }));
          })
        );
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.AutoLogin),
      exhaustMap(({ token }: { token: string }) => {
        return this.userService.autoLogin(token).pipe(
          map((connectedUser: LoggedUser) => {
            let token = connectedUser.token as string;
            localStorage.setItem('token', token);
            return authActions.SetLogin(connectedUser);
          }),
          catchError((error) => {
            return of(authActions.SetLoginErrors({ errors: error.error }));
          })
        );
      })
    )
  );

  lastChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.LastChat),
      map((lastChat) => {
        localStorage.setItem('lastChat', lastChat.lastChat);
        return authActions.SetLastChat(lastChat);
      })
    )
  );

  clearErrros$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.ClearErrors),
      map(() => {
        return authActions.SetLoginErrors({ errors: undefined });
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.Logout),
      map(() => {
        localStorage.removeItem('token');
        return authActions.SetLogin({ login: undefined, token: undefined });
      })
    )
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.Register),
      exhaustMap((newUser: User) => {
        return this.userService.register(newUser).pipe(
          map((connectedUser: LoggedUser) => {
            let token = connectedUser.token as string;
            localStorage.setItem('token', token);
            return authActions.SetLogin(connectedUser);
          }),
          catchError((error) => {
            return of(authActions.SetLoginErrors({ errors: error.error }));
          })
        );
      })
    );
  });
}
