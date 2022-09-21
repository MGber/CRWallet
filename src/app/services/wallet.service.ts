import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ODER_ENDPOINT} from "../config/constants";
import Order from "../models/order";
import {OrderInput} from "../models/order-input";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor(private http: HttpClient) {
  }

  public walletHistory(token: string) {
    return this.http.get<Order[]>(ODER_ENDPOINT, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token 
      })
      },
    );
  }

  public makeOrder(order: OrderInput, token: string) {
    return this.http.post<string>(ODER_ENDPOINT, order,{
      responseType: 'text' as 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      },
    );
  }
}
