import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Mail} from "../models/mail";
import {MAIL_ENDPOINT} from "../config/constants";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendMail(mail: Mail) {
    mail.admin = "maxime.gaber@gmail.com";
    console.log(mail);
    return this.http.post<boolean>(MAIL_ENDPOINT,  mail);
  }
}
