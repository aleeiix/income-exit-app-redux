import { AppState } from 'src/app/app.reducer';
import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './income-exit.actions';
import { IncomeExit } from '../models/income-exit.model';

export interface State {
  items: IncomeExit[];
}

export interface AppStateWithIncomeExit extends AppState {
  incomeExit: State;
}

export const initialState: State = {
  items: [],
};

const _incomeExitReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unsetItems, (state) => ({ ...state, items: [] }))
);

export function incomeExitReducer(state, action) {
  return _incomeExitReducer(state, action);
}
