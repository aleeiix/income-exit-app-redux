import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private _uiSubscription: Subscription;

  registerForm: FormGroup;
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

    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { name, email, password } = this.registerForm.value;
    this._authService
      .register(name, email, password)
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
