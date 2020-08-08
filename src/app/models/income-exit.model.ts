import { IncomeExitTypeEnum } from './income-exit-type.enum';

export class IncomeExit {
  quantity: number;
  type: IncomeExitTypeEnum;
  description: string;
  uid?: string;

  constructor(
    quantity: number,
    type: IncomeExitTypeEnum,
    description: string,
    uid?: string
  ) {
    this.quantity = quantity;
    this.type = type;
    this.description = description;
    this.uid = uid;
  }
}
