import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/store/app.state';
import { selectToken } from 'src/store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor( public router: Router,private store: Store<AppState>) {
  }

  canActivate(): boolean {
    this.store.select(pipe(selectToken)).subscribe((token) => {
      if (token === undefined) {
        this.router.navigate(['/login'])
      }
    });
    return true;
  }
}
