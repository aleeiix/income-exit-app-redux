import { createAction, props } from '@ngrx/store';
import { IncomeExit } from '../models/income-exit.model';

export const setItems = createAction(
  '[ICONME-EXIT] setItems',
  props<{ items: IncomeExit[] }>()
);
export const unsetItems = createAction('[ICONME-EXIT] unsetItems');
