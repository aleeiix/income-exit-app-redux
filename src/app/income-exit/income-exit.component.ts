import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from './../shared/ui.actions';

import { IncomeExitTypeEnum } from './../models/income-exit-type.enum';
import { IncomeExit } from '../models/income-exit.model';
import { IncomeExitService } from './../services/income-exit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-exit',
  templateUrl: './income-exit.component.html',
  styles: [],
})
export class IncomeExitComponent implements OnInit, OnDestroy {
  readonly incomeExitTypeEnumInComponent = IncomeExitTypeEnum;

  private _uiSubscription: Subscription;

  incomeForm: FormGroup;
  type: IncomeExitTypeEnum = IncomeExitTypeEnum.INCOME;
  isLoading: boolean;

  constructor(
    private _store: Store<AppState>,
    private _fromBuilder: FormBuilder,
    private _incomeExitService: IncomeExitService
  ) {}

  ngOnInit(): void {
    this._uiSubscription = this._store.select('ui').subscribe((uiState) => {
      this.isLoading = uiState.isLoading;
    });

    this.incomeForm = this._fromBuilder.group({
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
    });
  }

  setTypeIncome(): void {
    this.type = IncomeExitTypeEnum.INCOME;
  }

  setTypeExit(): void {
    this.type = IncomeExitTypeEnum.EXIT;
  }

  save(): void {
    if (this.incomeForm.invalid) {
      return;
    }

    this._store.dispatch(uiActions.startLoading());

    const { quantity, description } = this.incomeForm.value;
    const incomeExit = new IncomeExit(quantity, this.type, description);

    this._incomeExitService
      .createIncomeExit(incomeExit)
      .then(() => {
        this.incomeForm.reset();
        this.type = IncomeExitTypeEnum.INCOME;

        this._store.dispatch(uiActions.stopLoading());

        Swal.fire({
          icon: 'success',
          title: 'Registro creado!',
          text: description,
        });
      })
      .catch((error) => {
        this._store.dispatch(uiActions.stopLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  ngOnDestroy(): void {
    this._uiSubscription.unsubscribe();
  }
}
