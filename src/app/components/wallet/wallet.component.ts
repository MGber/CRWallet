import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  cryptoParam: any;
  modeParam: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cryptoParam = params['crypto'];
      this.modeParam = params['mode'];
    });
  }

  selectedIndex(){
    if(this.cryptoParam && this.modeParam){
      return 1
    }
    return 0
  }
}
