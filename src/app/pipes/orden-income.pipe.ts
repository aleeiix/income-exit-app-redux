import { IncomeExit } from 'src/app/models/income-exit.model';
import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExitTypeEnum } from '../models/income-exit-type.enum';

@Pipe({
  name: 'ordenIncome',
})
export class OrdenIncomePipe implements PipeTransform {
  transform(items: IncomeExit[]): IncomeExit[] {
    return [...items].sort((a, b) => {
      if (a.type === IncomeExitTypeEnum.INCOME) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
