import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Message from '../models/message';
import { GET_MESSAGES, SOCKET_ENDPOINT } from '../config/constants';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  public stompClient: CompatClient;
  public msg: string[] = [];
  public obsMess = new Rx.Subject<string>();
  lastCrypto : string;

  initializeWebSocketConnection(cryptoId: string) {
    if(this.lastCrypto){
      this.stompClient.unsubscribe(this.lastCrypto)
    }
    this.lastCrypto = cryptoId
    const ws = new SockJS(SOCKET_ENDPOINT);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({},() => {
      that.stompClient.subscribe(
        '/transfer/' + cryptoId,
        (message: IMessage) => {
          if (message.body) {
            that.obsMess.next(message.body);
          }
        },{id:cryptoId}
      );
    });
  }

  getObservableMessages() {
    return this.obsMess;
  }

  sendMessage(message: string, cryptoId: string, login: string) {
    this.stompClient.send(
      '/app/send/' + cryptoId,
      {},
      JSON.stringify({ message, login })
    );
  }

  public loadMessages(token: string, symbol: string) {
    return this.http.get<Message[]>(GET_MESSAGES + '?cryptoId=' + symbol, {
      headers: new HttpHeaders({
        Authorization: token,
        'Access-Control-Allow-Origin': '*',
      }),
    });
  }
}
