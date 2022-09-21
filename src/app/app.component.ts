import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import * as action from '../store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    if (localStorage.getItem('token') != null) {
      let token = localStorage.getItem('token') as string;
      this.store.dispatch(action.AutoLogin({ token: token }));
    }
    if (localStorage.getItem('lastChat') != null) {
      let lastChat = localStorage.getItem('lastChat') as string;
      this.store.dispatch(action.LastChat({ lastChat: lastChat }));
    }
  }
  title = 'CRWallet';
}
