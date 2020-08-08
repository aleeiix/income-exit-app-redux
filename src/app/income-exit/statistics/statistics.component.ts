import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IncomeExit } from 'src/app/models/income-exit.model';
import { IncomeExitTypeEnum } from 'src/app/models/income-exit-type.enum';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent implements OnInit {
  income: number = 0;
  exit: number = 0;

  totalIncome: number = 0;
  totalExit: number = 0;

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.select('incomeExit').subscribe(({ items }) => {
      this.generateStadistic(items);
    });
  }

  generateStadistic(items: IncomeExit[]): void {
    this.reset();

    for (const item of items) {
      if (item.type === IncomeExitTypeEnum.INCOME) {
        this.totalIncome += item.quantity;
        this.income++;
      } else {
        this.totalExit += item.quantity;
        this.exit++;
      }
    }
  }

  private reset() {
    this.income = 0;
    this.exit = 0;
    this.totalIncome = 0;
    this.totalExit = 0;
  }
}
