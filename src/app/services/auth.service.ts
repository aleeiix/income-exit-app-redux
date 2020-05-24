import '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from './../auth/auth.actions';

import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firestoreUser: Subscription;

  constructor(
    private _store: Store<AppState>,
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {}

  initAuthListener(): void {
    this._fireAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this._firestoreUser = this._firestore
          .doc(`${firebaseUser.uid}/user`)
          .valueChanges()
          .subscribe((firestoreUser: User) => {
            const user: User = User.fromFirebase(firestoreUser);
            this._store.dispatch(authActions.setUser({ user }));
          });
      } else {
        if (this._firestoreUser) {
          this._firestoreUser.unsubscribe();
        }
        this._store.dispatch(authActions.unSetUser());
      }
    });
  }

  register(name: string, email: string, password: string): Promise<void> {
    return this._fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user.uid, name, user.email);
        return this._firestore.doc(`${user.uid}/user`).set({ ...newUser });
      });
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this._fireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this._fireAuth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this._fireAuth.authState.pipe(
      map((user) => {
        return user !== null;
      })
    );
  }
}
