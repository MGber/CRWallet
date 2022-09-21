import {Component, Input, OnInit} from '@angular/core';
import {CryptoCurrency} from '../../../models/crypto-currency';
import {ActivatedRoute} from '@angular/router';
import {CryptoService} from '../../../services/crypto.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import {faBell} from "@fortawesome/free-solid-svg-icons";

import {MatSnackBar} from "@angular/material/snack-bar";
import {selectError, selectToken} from '../../../../store/selectors/user.selector';
import {Observable} from 'rxjs';
import {CryptoPrice} from "../../../models/crypto-price";
import {PreferenceNotificationService} from "../../../services/preference-notification.service";

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css'],
})
export class CryptoComponent implements OnInit {
  faBell = faBell;
  cryptocurrency: CryptoCurrency;
  symbol: string;
  notifActive: boolean;
  toggleButtonColor: any;

  constructor(
    private route: ActivatedRoute,
    private service: CryptoService,
    private store: Store<AppState>,
    private preferenceService: PreferenceNotificationService,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.symbol = paramMap.get('symbol') ?? '';
      this.store.pipe(select(selectToken)).subscribe((token) => {
        let definedToken = token as string
        this.service.crypto(this.symbol, definedToken).subscribe({
          next: (value) => {
            this.cryptocurrency = value;
          },
          error: (error) => {},
          complete: () => {},
        });
        this.preferenceService.getPreferences(definedToken).subscribe(
          (preferences) => {
           let prefNotif = preferences.find(p => p.cryptoId == this.symbol);
           this.notifActive = (prefNotif != null);
            this.toggleButtonColor = this.getButtonColor();
          }
        )
      });
    });
  }

  getPercentChange(percent: string) {
    if (+percent >= 0) {
      return '+' + (+percent).toFixed(2);
    }
    return '' + (+percent).toFixed(2);
  }

  getColor(number: number) {
    return number >= 0 ? 'text-success' : 'text-danger';
  }

  getVolume() {
    let volume = this.cryptocurrency.volume24h;
    let E = volume.substring(volume.indexOf('E') + 1);
    let multiplicator = Math.pow(+E, 10);
    let volumeNumber = +volume.substring(0, volume.indexOf('E'));
    let result = volumeNumber * multiplicator;
    if (result > 100000) result.toFixed(0);
    return result;
  }

  private createPreference(definedToken: string) {
    this.preferenceService.createPreference(definedToken, {
      cryptoId: this.cryptocurrency.symbol,
      price: this.cryptocurrency.value
    }).subscribe({
      complete: () => {
        this.notifActive = true;
        this.toggleButtonColor = this.getButtonColor();
        this.snackbar.open("Suscription added !", "Got it");
      }
    })
  }

  private deletePreference(definedToken: string) {
    this.preferenceService.deletePreference(definedToken, this.symbol).subscribe({
      complete: () => {
        this.notifActive = false;
        this.toggleButtonColor = this.getButtonColor();
        this.snackbar.open("Suscription deleted !", "Got it")
      }
    });
  }

  getButtonColor() {
    return this.notifActive ? "btn-danger" : "btn-info"
  }

  removePreference() {
    this.store.pipe(select(selectToken)).subscribe({
    next: (token) => {
      let definedToken = token as string;
      this.deletePreference(definedToken);
    }
    });
  }

  addPreference() {
    this.store.pipe(select(selectToken)).subscribe({
      next: (token) => {
        let definedToken = token as string;
        this.createPreference(definedToken);
      }
    });
  }

  togglePreference() {
    if(this.notifActive)
      this.removePreference();
    else
      this.addPreference();
  }
}
