import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../../../../../store/app.state";
import {select, Store} from "@ngrx/store";
import {CryptoService} from "../../../../services/crypto.service";
import {selectToken} from "../../../../../store/selectors/user.selector";
import TimedValue from "../../../../models/timed-value";
import {createChart} from 'lightweight-charts';

@Component({
  selector: 'app-coin-graph',
  templateUrl: './coin-graph.component.html',
  styleUrls: ['./coin-graph.component.css']
})
export class CoinGraphComponent implements OnInit {
  @Input() coinName: string;
  @ViewChild('container') input : any;
  private coinHistory: TimedValue[];

  constructor(private store: Store<AppState>,
              private cryptoService: CryptoService) {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe((token) => {
      this.cryptoService.coinHistory(this.coinName, token as string).subscribe((coinHistory) => {
          this.coinHistory = coinHistory;
        },
        error => {
        },
        () => {
          const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
          // @ts-ignore
          const chart = createChart(document.getElementById('container'), chartOptions);

          const series = chart.addBaselineSeries();
          let data = this.coinHistory.map(tv => {
              let parsedDate = new Date(tv.date!);
              console.log(parsedDate.toLocaleDateString('sv'));
              return {time: parsedDate.toLocaleDateString('sv'), value: tv.value};
          });
          data.pop();
          console.log("Data : ",data);
          // @ts-ignore
          series.setData(data);
          chart.timeScale().fitContent();
        });
    });

  }

}
