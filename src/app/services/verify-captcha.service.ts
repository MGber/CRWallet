import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VerifyCaptchaService {
  private readonly VERIFY_URL: string;

  constructor(private http: HttpClient) {
    this.VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
  }

  verifyCaptcha(token: string) {
    return this.http.post(this.VERIFY_URL, {
      "secret": token,
    }, {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
