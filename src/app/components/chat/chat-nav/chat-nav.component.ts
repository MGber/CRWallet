import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CryptoService } from '../../../services/crypto.service';
import { AppState } from '../../../../store/app.state';
import { CryptoCurrency } from '../../../models/crypto-currency';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css'],
})
export class ChatNavComponent implements OnInit {
  @Input() currency: CryptoCurrency;
  @Input() currentCrypto: string;
  @Output() cryptoChangeEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  isActiveClass(symbol: string) {
    if (symbol === this.currentCrypto) {
      return 'isActive';
    }
    return '';
  }

  changeCrypto() {
    this.cryptoChangeEvent.emit(this.currency.symbol);
  }
}
