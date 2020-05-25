import { IncomeExitTypeEnum } from './income-exit-type.enum';

export class IncomeExit {
  // uid?: string;
  quantity: number;
  type: IncomeExitTypeEnum;
  description: string;

  constructor(
    quantity: number,
    type: IncomeExitTypeEnum,
    description: string
    // uid?: string
  ) {
    this.quantity = quantity;
    this.type = type;
    this.description = description;
    // this.uid = uid;
  }
}
