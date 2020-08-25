import { DashboardRoutesModule } from './../dashboard/dashboard-routes.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { LaddaModule } from 'angular2-ladda';
import { ChartsModule } from 'ng2-charts';
import { OrdenIncomePipe } from './../pipes/orden-income.pipe';
import { BalanceComponent } from './balance/balance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { IncomeExitComponent } from './income-exit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { incomeExitReducer } from './income-exit.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExitComponent,
    StatisticsComponent,
    DetailComponent,
    OrdenIncomePipe,
    BalanceComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExit', incomeExitReducer),
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    LaddaModule.forRoot({
      style: 'zoom-in',
    }),
    SharedModule,
    DashboardRoutesModule,
  ],
})
export class IncomeExitModule {}
