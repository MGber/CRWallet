import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LOGIN,
  LOGINWITH,
  REGISTER,
  USER_ENDPOINT,
} from '../config/constants';
import { LoginUserViewModel } from '../models/viewmodels/login-user-view-model';
import { LoggedUser } from '../models/viewmodels/logged-user';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, public afAuth: AngularFireAuth) {}

  public login(user: LoginUserViewModel) {
    return this.http.post<LoggedUser>(LOGIN, user);
  }
  public loginWithOtherServices(user: LoginUserViewModel) {
    return this.http.post<LoggedUser>(LOGINWITH, user);
  }

  public register(user: User) {
    return this.http.post<LoggedUser>(REGISTER, user);
  }

  public autoLogin(token: string) {
    return this.http.get<LoggedUser>(USER_ENDPOINT, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  public loginWith(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
