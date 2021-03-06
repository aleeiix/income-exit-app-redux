import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canLoad(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this._router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this._authService.isAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this._router.navigate(['/login']);
        }
      })
    );
  }
}
