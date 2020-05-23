import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-exit/statistics/statistics.component';
import { IncomeExitComponent } from '../income-exit/income-exit.component';
import { DetailComponent } from '../income-exit/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-exit', component: IncomeExitComponent },
  { path: 'detail', component: DetailComponent },
];
