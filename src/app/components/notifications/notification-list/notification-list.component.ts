import { Component, OnInit } from '@angular/core';
import {AppState} from "../../../../store/app.state";
import {select, Store} from "@ngrx/store";
import {NotificationService} from "../../../services/notification.service";
import {selectToken} from "../../../../store/selectors/user.selector";
import Notification from "../../../models/notification";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  public notifications: Notification[];
  public displayedColumns = ['image', 'date', 'message'];

  constructor(private store: Store<AppState>,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe({
      next: (token) => {
        this.notificationService.getNotifications(token as string).subscribe({
          next: (notifications) => {this.notifications = notifications as Notification[]}
        })
      }
    })
  }

  getDate(date_notif: string) {
    return new Date(date_notif).toLocaleString('fr-fr').substring(0, 16);
  }
}
