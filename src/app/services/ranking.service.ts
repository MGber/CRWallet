import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import Player from "../models/player";
import {PLAYER_ENDPOINT} from "../config/constants";

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  constructor(private http: HttpClient) {}

  public getRanking(token: string) {
    return this.http.get<Player[]>(PLAYER_ENDPOINT, {
      headers: new HttpHeaders({
        "Authorization": token
      })
    });
  }
}
