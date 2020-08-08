import { IncomeExitTypeEnum } from './../../models/income-exit-type.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IncomeExit } from 'src/app/models/income-exit.model';
import { IncomeExitService } from 'src/app/services/income-exit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  incomeExitsSubs: Subscription;
  incomeExitTypeEnum = IncomeExitTypeEnum;
  incomeExits: IncomeExit[] = [];

  constructor(
    private _store: Store<AppState>,
    private _incomeExitService: IncomeExitService
  ) {}

  ngOnInit(): void {
    this.incomeExitsSubs = this._store
      .select('incomeExit')
      .subscribe(({ items }) => {
        this.incomeExits = items;
      });
  }

  remove(uid: string): void {
    this._incomeExitService
      .removeIncomeExit(uid)
      .then(() => {
        Swal.fire(
          'Removed',
          'The item has been successfully removed.',
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  }

  ngOnDestroy(): void {
    if (this.incomeExitsSubs) {
      this.incomeExitsSubs.unsubscribe();
    }
  }
}
