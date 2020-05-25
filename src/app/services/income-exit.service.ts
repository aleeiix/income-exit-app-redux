import '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IncomeExit } from '../models/income-exit.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeExitService {
  constructor(
    private _firestore: AngularFirestore,
    private _authService: AuthService
  ) {}

  createIncomeExit(incomeExit: IncomeExit): Promise<DocumentReference> {
    return this._firestore
      .doc(`${this._authService.user.uid}/income-exit`)
      .collection('items')
      .add({ ...incomeExit });
  }
}
