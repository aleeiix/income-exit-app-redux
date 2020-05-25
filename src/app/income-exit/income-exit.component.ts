import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeExitTypeEnum } from './../models/income-exit-type.enum';
import { IncomeExit } from '../models/income-exit.model';
import { IncomeExitService } from './../services/income-exit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-income-exit',
  templateUrl: './income-exit.component.html',
  styles: [],
})
export class IncomeExitComponent implements OnInit {
  readonly incomeExitTypeEnumInComponent = IncomeExitTypeEnum;

  incomeForm: FormGroup;
  type: IncomeExitTypeEnum = IncomeExitTypeEnum.INCOME;

  constructor(
    private _fromBuilder: FormBuilder,
    private _incomeExitService: IncomeExitService
  ) {}

  ngOnInit(): void {
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

    const { quantity, description } = this.incomeForm.value;
    const incomeExit = new IncomeExit(quantity, this.type, description);

    this._incomeExitService
      .createIncomeExit(incomeExit)
      .then(() => {
        this.incomeForm.reset();
        this.type = IncomeExitTypeEnum.INCOME;

        Swal.fire({
          icon: 'success',
          title: 'Registro creado!',
          text: description,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }
}
