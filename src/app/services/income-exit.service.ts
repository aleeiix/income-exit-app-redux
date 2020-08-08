import '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  DocumentReference,
  DocumentChangeAction,
} from '@angular/fire/firestore';
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
    delete incomeExit.uid;
    return this._firestore
      .doc(`${this._authService.user.uid}/income-exit`)
      .collection('items')
      .add({ ...incomeExit });
  }

  initIcomeExitListener(userId: string) {
    return this._firestore
      .collection(`${userId}/income-exit/items`)
      .snapshotChanges()
      .pipe(
        map((snapshots) =>
          snapshots.map((snapshot: DocumentChangeAction<IncomeExit>) => ({
            uid: snapshot.payload.doc.id,
            ...snapshot.payload.doc.data(),
          }))
        )
      );
  }

  removeIncomeExit(itemId: string): Promise<void> {
    return this._firestore
      .doc(`${this._authService.user.uid}/income-exit/items/${itemId}`)
      .delete();
  }
}
