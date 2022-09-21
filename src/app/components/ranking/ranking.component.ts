import { Component, OnDestroy, OnInit } from '@angular/core';
import {RankingService} from "../../services/ranking.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {selectToken} from "../../../store/selectors/user.selector";
import Player from "../../models/player";

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {
  public ranking: Player[];
  timer : any

  constructor(private rankingService: RankingService, private store: Store<AppState>) { }
  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

  ngOnInit(): void {
    this.store.pipe(select(selectToken)).subscribe((token) => {
      this.getRanking(token)
      this.timer = setInterval(()=>
        this.getRanking(token)
      , 30000);
    });
  }
  displayedColumns = ['rank', 'name', 'points']


  getRanking = (token : string|undefined) =>
    this.rankingService.getRanking(token as string).subscribe({
      next: (value) => {this.ranking = value;},
      error: (error) => {},
      complete: () => {},
    });
}
