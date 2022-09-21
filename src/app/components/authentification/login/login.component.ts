import { Component, OnInit } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import { selectError } from 'src/store/selectors/user.selector';
import * as action from '../../../../store/actions/user.actions';
import { FormControl, FormGroup } from '@angular/forms';
import * as auth from 'firebase/auth';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase/compat';
import {
  faFacebook,
  faYahoo,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  tryCount = 0;
  faYahoo = faYahoo;
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  buttonsEnabled = true;
  errorMessage: Observable<string | undefined>;
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(action.ClearErrors());
    this.errorMessage = this.store.pipe(select(selectError));
  }

  onSubmit(value: any) {
    if (this.buttonsEnabled) {
      this.trySecurity();
      this.store.dispatch(action.Login(value))
    }
  }

  trySecurity() {
    this.tryCount++;
    if (this.tryCount > 2) {
      this.tryCount = 0;
      this.buttonsEnabled = false;
      alert("Wait 30 seconds before next attempt")
      setTimeout(() => {
        this.buttonsEnabled = true;
      }, 30000);
    }
  }

  onAuthWith(value: string) {
    if (this.buttonsEnabled) {
      this.trySecurity();
      let provider;
      switch (value) {
        case 'yahoo':
          provider = new auth.OAuthProvider('yahoo.com');
          break;
        case 'google':
          provider = new auth.GoogleAuthProvider();
          break;
        case 'facebook':
          provider = new auth.FacebookAuthProvider();
          break;
      }
      this.userService.loginWith(provider).then((user: any) => {
        this.store.dispatch(
          action.LoginWith({
            login: user.additionalUserInfo?.profile.name,
            mail: user.additionalUserInfo?.profile.email,
          })
        )
      });
    }
  }
}
