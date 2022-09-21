import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto.service';
import { CryptoCurrency } from '../../../models/crypto-currency';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css'],
})
export class CryptoListComponent implements OnInit {
  public cryptoList: CryptoCurrency[] = [];

  constructor(private service: CryptoService) {}

  ngOnInit(): void {
    this.service.cryptoList().subscribe({
      next: (value) => {
        this.cryptoList = value;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cryptoList.sort((a, b) => +b.marketCap - +a.marketCap);
      },
    });
  }

  getColors(value: number): string {
    return value > 0 ? 'text-success' : 'text-danger';
  }

  getPercentString(percentChange24h: any) {
    return percentChange24h.indexOf("-") != -1 ? percentChange24h.substring(0, 5) : percentChange24h.substring(0, 4)
  }
}
