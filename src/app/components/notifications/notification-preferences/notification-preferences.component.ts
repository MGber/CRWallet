import {Component, OnInit} from '@angular/core';
import {AppState} from "../../../../store/app.state";
import {select, Store} from "@ngrx/store";
import {PreferenceNotificationService} from "../../../services/preference-notification.service";
import {selectToken} from "../../../../store/selectors/user.selector";
import PreferenceNotification from "../../../models/preference-notification";
import {FormControl, Validators} from "@angular/forms";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.css']
})
export class NotificationPreferencesComponent implements OnInit {
  public notifications: string;
  public preferences: PreferenceNotification[];
  public active = new FormControl(false);
  public percent = new FormControl(1);
  public faTrash = faTrash;
  public current: PreferenceNotification | undefined;
  private percentSub: Subscription;
  private activeSub: Subscription;

  constructor(private store: Store<AppState>,
              private preferencesService: PreferenceNotificationService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe({
      next: (token) => {
        let definedToken = token as string;
        this.preferencesService.getPreferences(definedToken).subscribe({
          next: (preferences) => {
            this.preferences = preferences as PreferenceNotification[];
            console.log(this.preferences)
          }
        })
      },
    });
     this.percentSub = this.getPercentSub();
    this.activeSub = this.getActiveSub();
  }

  private getPercentSub() {
    return this.percent.valueChanges.subscribe((value) => {
      if (value && this.current) {
        this.current.percent = value;
        this.store.pipe(select(selectToken)).subscribe((token) => {
          this.setCurrent(token as string).subscribe({
            complete: () => {
              this.snackbar.open("Percent changed.", "Got it");
            }
          });
        });
      }
    });
  }

  private getActiveSub() {
    return this.active.valueChanges.subscribe((value => {
      if (value != undefined && this.current) {
        this.current.is_active = value;
        this.store.pipe(select(selectToken)).subscribe((token) => {
          this.setCurrent(token as string).subscribe({
            complete: () => {
              if (value)
                this.snackbar.open("Activated", "Got it");
              else
                this.snackbar.open("Disabled", "Got it");
            }
          })
        })
      }
    }));
  }

  private setCurrent(token: string) {
    return this.preferencesService.setPreference(token as string, {
      cryptoId: this.current?.cryptoId,
      isActive: this.current?.is_active,
      newPercent: this.current?.percent
    });
  }

  change($event: Event) {
    this.percentSub.unsubscribe();
    this.activeSub.unsubscribe();
    let val = ($event.target as HTMLInputElement).value
    this.current = this.preferences.find(p => p.cryptoId == val);
    if (!(this.current?.is_active && this.current.percent)) {
    } else {
      this.active.setValue(this.current.is_active);
      this.percent.setValue(this.current.percent);
    }
    this.activeSub = this.getActiveSub();
    this.percentSub = this.getPercentSub();
  }

  removeCurrent() {
    this.store.pipe(select(selectToken)).subscribe((token) => {
      if (this.current && this.current.cryptoId)
        this.preferencesService.deletePreference(token as string, this.current?.cryptoId).subscribe({
          complete: () => {
            this.snackbar.open("Deleted", "Got it");
            this.preferences = this.preferences.filter(p => p.cryptoId != this.current?.cryptoId);
            this.current = undefined;
          },
        })
    })
  }
}
