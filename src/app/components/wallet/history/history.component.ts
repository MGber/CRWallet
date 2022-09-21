import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WalletService} from '../../../services/wallet.service';
import Order from '../../../models/order';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/store/app.state';
import {selectToken} from 'src/store/selectors/user.selector';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, AfterViewInit {
  @ViewChild('tableSort') tableSort: MatSort;
  orders: any[] = [];
  searchOrders: Order[] = [];
  dataSource: MatTableDataSource<Order>;

  constructor(private service: WalletService, private store: Store<AppState>) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe((token) => {
      this.service.walletHistory(token as string).subscribe({
        next: (value) => {
          this.orders = value;
          this.orders.forEach((i) => {
            i.dateTransaction = this.formatDate(i.dateTransaction);
            i.value = (i.unitPrice * i.quantity).toString().substring(0, 8);
          })
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.dataSource = new MatTableDataSource<Order>(this.orders);
          this.dataSource.sortingDataAccessor = (item: any, property) => {
            switch(property) {
              case 'cryptoName': return item?.cryptoMoney?.cryptoName;
              case 'slug': return item?.cryptoMoney?.slug;
              default: return item[property];
            }
          };
          this.dataSource.filterPredicate = function (data,filter) : boolean {
            const dataStr = data.quantity! + data.mode! + data.unitPrice + data.dateTransaction +  data.cryptoMoney?.slug + data.cryptoMoney?.symbol + data.cryptoMoney?.cryptoName + (data.unitPrice! * data.quantity!).toString().substring(0, 8);
            return dataStr.toLowerCase().indexOf(filter) != -1;
          }
        },
      });
    });
  }

  displayedColumns: string[] = [
    'cryptoName',
    'slug',
    'dateTransaction',
    'quantity',
    'unitPrice',
    'mode',
    'value',
  ];

  formatDate(dateTransaction: any) {
    return new Date(dateTransaction).toLocaleString('fr-fr', {});
  }

  getPriceColor(mode: string) {
    if (mode == 'ACHAT') return 'text-danger';
    return 'text-success';
  }

  sortData($event: any) {
    this.dataSource.sort = this.tableSort;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
