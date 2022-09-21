import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CRYPTO_ENDPOINT, CRYPTO_HISTORY, CRYPTO_LIST_ENDPOINT} from "../config/constants";
import {CryptoCurrency} from "../models/crypto-currency";
import TimedValue from "../models/timed-value";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  public cryptoList() {
    return this.http.get<CryptoCurrency[]>(CRYPTO_LIST_ENDPOINT);
  }

  public crypto(symbol: string, token: string) {
    return this.http.get<CryptoCurrency>(
      CRYPTO_ENDPOINT + "?id=" + symbol,
      {headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: token
        })},
    );
  }

  public coinHistory(slug: string, token: string) {
    return this.http.get<TimedValue[]>(`${CRYPTO_HISTORY}?name=${slug}`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    })
  }
}
