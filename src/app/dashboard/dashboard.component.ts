import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { State as AuthState } from '../auth/auth.reducer';

import { IncomeExitService } from './../services/income-exit.service';
import * as incomeExitActions from './../income-exit/income-exit.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  storeSubs: Subscription;
  incomeExitSubs: Subscription;

  constructor(
    private _store: Store<AppState>,
    private _incomeExitService: IncomeExitService
  ) {}

  ngOnInit(): void {
    this.storeSubs = this._store
      .select('auth')
      .pipe(filter((auth: AuthState) => auth.user !== null))
      .subscribe((auth: AuthState) => {
        this.incomeExitSubs = this._incomeExitService
          .initIcomeExitListener(auth.user.uid)
          .subscribe((incomeExits) => {
            this._store.dispatch(
              incomeExitActions.setItems({ items: incomeExits })
            );
          });
      });
  }

  ngOnDestroy(): void {
    if (this.storeSubs) {
      this.storeSubs.unsubscribe();
    }
    if (this.incomeExitSubs) {
      this.incomeExitSubs.unsubscribe();
    }
  }
}
