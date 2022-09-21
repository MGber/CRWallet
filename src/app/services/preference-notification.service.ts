import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import CreatePreferenceViewModel from "../models/viewmodels/create-preference-view-model";
import EditPreferenceViewModel from "../models/viewmodels/edit-preference-view-model";
import {PREFERENCES} from "../config/constants";
import PreferenceNotification from "../models/preference-notification";

@Injectable({
  providedIn: 'root'
})
export class PreferenceNotificationService {
  constructor(private http: HttpClient) { }

  getPreferences(token: string) {
    return this.http.get<PreferenceNotification[]>(PREFERENCES, {
      headers: new HttpHeaders({
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  createPreference(token: string, preference: CreatePreferenceViewModel) {
    return this.http.post(PREFERENCES, preference, {
      headers: new HttpHeaders({
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  deletePreference(token: string, symbol: string) {
    return this.http.delete(`${PREFERENCES}?cryptoId=${symbol}`, {
      headers: new HttpHeaders({
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
      }),
    });
  }

  setPreference(token: string, preference: EditPreferenceViewModel) {
    return this.http.put(PREFERENCES, preference, {
      headers: new HttpHeaders({
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
      }),
    })
  }
}
