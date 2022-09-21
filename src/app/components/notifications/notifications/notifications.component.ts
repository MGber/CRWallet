import {Component, OnInit} from '@angular/core';
import {interval} from "rxjs";
import firebase from "firebase/compat";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.state";
import {NotificationService} from "../../../services/notification.service";
import {selectToken} from "../../../../store/selectors/user.selector";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private token: string;

  constructor(private store: Store<AppState>,
              private notificationService: NotificationService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    let durationSeconds = 30;
    let oneSecond = 1000;
    this.store.pipe(select(selectToken)).subscribe((token) => {
      this.token = token as string;
      interval(durationSeconds * oneSecond).subscribe(() => {
        if (this.token !== undefined && this.token !== "") {
          console.log("Pooling");
          this.notificationService.sendNotifications(token as string).subscribe({
            complete: () => {
              this.notificationService.getNotifications(token as string).subscribe((notifications) => {
                let unreadNotifications = notifications.filter(n => n.is_read === false);
                for (let i = 0; i < unreadNotifications.length; i++) {
                  this.snackbar.open(unreadNotifications[i].message as string, "Got it");
                }
              }, (error => {
                console.log(error);
              }));
            }
          })
        }
      })
    })
  }

}
