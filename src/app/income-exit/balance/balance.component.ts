import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
})
export class BalanceComponent implements OnInit {
  @Input() totalIncome: number;
  @Input() totalExit: number;

  doughnutChartLabels: Label[] = ['Incomes', 'Exits'];
  doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}
}
