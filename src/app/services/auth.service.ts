import '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore
  ) {}

  initAuthListener(): void {
    this._fireAuth.authState.subscribe((user) => {
      console.log('authState ==> ', user);
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
