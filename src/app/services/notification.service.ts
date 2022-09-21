import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NOTIFICATION, SEND_MESSAGE, SEND_NOTIFICATIONS} from "../config/constants";
import Notification from "../models/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications(token: string) {
    return this.http.get<Notification[]>(NOTIFICATION, {
      headers: new HttpHeaders({
        'Authorization' : token,
        'Access-Control-Allow-Origin': '*'
      })
    })
  }

  sendNotifications(token: string) {
    return this.http.post(SEND_NOTIFICATIONS, {}, {
      headers: new HttpHeaders({
        'Authorization' : token,
        'Access-Control-Allow-Origin': '*'
      })
    });
  }
}
