import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoService } from 'src/app/services/crypto.service';
import {
  selectError,
  selectToken,
} from '../../../store/selectors/user.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/store/app.state';
import * as action from '../../../store/actions/user.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  userLogged: Boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe((token) => {
      console.log(token);
      if (token === undefined) {
        this.userLogged = false;
      } else {
        this.userLogged = true;
      }
    });
  }

  logout() {
    this.store.dispatch(action.Logout());
  }
}
