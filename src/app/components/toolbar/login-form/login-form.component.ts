import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, finalize, startWith } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../../services/api/errors/validation.error';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public load = false;
  private readonly subscription = new Subscription();
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginFormComponent>, private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('i7d8a9lgo', [Validators.required, Validators.minLength(3)]),
    });
  }

  public ngOnInit(): void {
    const controls = Object.values(this.form.controls);
    let subscription = this.form.statusChanges
      .pipe(
        distinctUntilChanged(),
        filter(() => this.form.invalid && this.form.hasError('wrongEmailOrPassword'))
      )
      .subscribe(() => {
        controls.forEach(control => control.setErrors({ wrongEmailOrPassword: true }));
      });

    this.subscription.add(subscription);

    subscription = this.form.valueChanges
      .pipe(
        filter(() => controls.some(control => control.hasError('wrongEmailOrPassword')))
      )
      .subscribe(() => {
        controls.forEach(control => control.updateValueAndValidity({ onlySelf: true }));
      });
    this.subscription.add(subscription);
  }

  public submitLoginForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.load = true;
    const { email, password } = this.form.controls;
    this.authService.auth(email.value, password.value)
      .pipe(finalize(() => {
        this.load = false;
      }))
      .subscribe(
        () => this.dialogRef.close(),
        this.onLoginError.bind(this),
      );
  }

  private onLoginError(errorResponse: HttpErrorResponse): void {
    if (new ValidationError().equals(errorResponse.error)) {
      this.form.controls.email.setErrors({ email: true });
    } else {
      this.form.setErrors({ wrongEmailOrPassword: true });
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
