import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _fireAuth: AngularFireAuth) {}

  initAuthListener(): void {
    this._fireAuth.authState.subscribe((user) => {
      console.log('authState ==> ', user);
    });
  }

  register(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this._fireAuth.createUserWithEmailAndPassword(email, password);
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
