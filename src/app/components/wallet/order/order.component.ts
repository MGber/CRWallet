import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CryptoPrice} from "../../../models/crypto-price";
import {CryptoService} from "../../../services/crypto.service";
import {WalletService} from "../../../services/wallet.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.state";
import {FormBuilder, FormControl, FormGroup, Validators, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {selectToken} from "../../../../store/selectors/user.selector";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() cryptoOrder: string;
  @Input() modeOrder: string;

  errorMessage: Observable<string | null>;

  public cryptoPrices: CryptoPrice[] = [];
  symbol: any;
  public unitPrice: number;
  public submitted = false;

  constructor(private walletService: WalletService,
              private cryptoService: CryptoService,
              private store: Store<AppState>,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
  }

  public orderForm: FormGroup;


  ngOnInit(): void {
    console.log("Mode crypto :", this.modeOrder, this.cryptoOrder);
    this.unitPrice = 0;
    this.cryptoService.cryptoList().subscribe({
      next: (value => {
        this.cryptoPrices = value.map(val => new CryptoPrice(val.symbol, +val.value));
        if (value.length > 0) {
          this.symbol = value[0].symbol;
          this.unitPrice = value[0].value
        }
      }),
      error: (err => {
        console.log(err)
      }),
      complete: () => {
      }
    });
    this.orderForm = this.fb.group({
      quantity: [0.0001, [Validators.required, Validators.min(0.0001)]],
      mode: [this.modeOrder, Validators.required],
      crypto: [this.cryptoOrder, Validators.required],
    });
  }

  public get orderFormControls() {
    return this.orderForm.controls;
  }

  public get formQuantity() {
    return this.orderForm.get("quantity");
  }

  public get formMode() {
    return this.orderForm.get("mode");
  }

  public get formCrypto() {
    return this.orderForm.get("crypto");
  }


  onSubmit(values: any) {

    console.log(values);
    this.submitted = true;
    if (this.formCrypto?.valid) {
      this.store.pipe(select(selectToken)).subscribe((token) => {
        this.walletService.makeOrder({
          mode: values.mode,
          quantity: values.quantity,
          idCrypto: values.crypto,
          unitPrice: this.unitPrice
        }, token as string).subscribe({
          complete: () => {
            this.snackBar.open(`Bought ${values.quantity.toString().substring(0, 9)} ${values.crypto} for ${(this.unitPrice * values.quantity).toString().substring(0, 9)}$`)
          }
        })
      })
    }
  }

  onChange(event: Event) {
    this.symbol = (event.target as HTMLInputElement).value
    let searchedPrice = this.cryptoPrices.find(v => v.symbol === this.symbol);
    if (searchedPrice)
      this.unitPrice = searchedPrice.price;
    else
      this.unitPrice = 0;
  }
}

//TODO ENLEVER TOKEN
