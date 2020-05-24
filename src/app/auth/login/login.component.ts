import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _uiSubscription: Subscription;

  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private _store: Store<AppState>,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._uiSubscription = this._store.select('ui').subscribe((uiState) => {
      this.isLoading = uiState.isLoading;
    });

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this._store.dispatch(uiActions.startLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, password } = this.loginForm.value;
    this._authService
      .login(email, password)
      .then((credentials) => {
        this._store.dispatch(uiActions.stopLoading());
        // Swal.close();
        this._router.navigate(['/']);
      })
      .catch((error) => {
        this._store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  ngOnDestroy() {
    this._uiSubscription.unsubscribe();
  }
}
