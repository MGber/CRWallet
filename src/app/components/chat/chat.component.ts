import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  selectLastChat,
  selectToken,
} from '../../../store/selectors/user.selector';
import { CryptoCurrency } from '../../models/crypto-currency';
import * as action from '../../../store/actions/user.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  currencies: CryptoCurrency[];
  currentCrypto: string;

  constructor(
    private cryptoService: CryptoService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cryptoService.cryptoList().subscribe({
      next: (value) => {
        this.currencies = value;
        this.route.queryParams.subscribe((params) => {
          let cryptoParam = params['crypto'];
          if(cryptoParam){
            this.currentCrypto = cryptoParam
            this.store.dispatch(action.LastChat({ lastChat: cryptoParam }));
          }else{
            this.store.pipe(select(selectLastChat)).subscribe((crypto) => {
              this.currentCrypto = crypto || value[0].cryptoName;
            });
          }
        });
      },
      error: () => {},
      complete: () => {},
    });
  }

  changeCrypto(cryptoId: string) {
    this.currentCrypto = cryptoId;
    this.store.dispatch(action.LastChat({ lastChat: cryptoId }));
  }
}
