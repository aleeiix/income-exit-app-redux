import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string;
  nameSubscription: Subscription;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.nameSubscription = this._store
      .select('auth')
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user }) => {
        this.name = user.name;
      });
  }

  logout(): void {
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    this._authService
      .logout()
      .then(() => {
        Swal.close();
        this._router.navigate(['/login']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  ngOnDestroy() {
    this.nameSubscription.unsubscribe();
  }
}
