import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {
  ITrainer,
  IUser,
  USER_STATUS,
  APPROVE_STATE
} from '../../../services/api/api-app/app-user-api/user.interface';
import { AppUserApiService } from '../../../services/api/api-app/app-user-api/app-user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutePreloaderService } from '../../../services/route-preloader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, finalize, map } from 'rxjs/operators';
import { EMPTY_USER } from '../../tabs/users/empty-user';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

enum GROUPS {
  PHOTO = 'photo',
  CERTIFICATES = 'certificate',
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnDestroy, OnChanges {
  @Input()
  public user: ITrainer = EMPTY_USER;

  @Input()
  public load = false;

  /** Pass enums */
  public readonly GROUPS = GROUPS;
  public readonly APPROVE_STATE = APPROVE_STATE;
  public readonly STATUSES = USER_STATUS;

  /** Controls */
  public readonly name = new FormControl('', [Validators.minLength(2), Validators.maxLength(40)]);
  public readonly email = new FormControl('', [Validators.email]);
  public readonly about = new FormControl('', [Validators.minLength(2), Validators.maxLength(200)]);
  public readonly status = new FormControl('');

  public statusList = Object.values(USER_STATUS).filter((_, index) => index < USER_STATUS.MAX);
  public readonly loadList = new Set<string>();
  private readonly subscription = new Subscription();

  constructor(
    private appUserApi: AppUserApiService,
    private snackBar: MatSnackBar,
    private preloader: RoutePreloaderService,
  ) {
    //  Empty
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const user: ITrainer | undefined = changes.user && changes.user.currentValue;
    if (user !== undefined && user !== EMPTY_USER) {
      if (user.additional) {
        this.name.setValue(user.additional.name);
        this.email.setValue(user.additional.email);
        this.about.setValue(user.about);
        this.status.setValue(user.status);
      }
      this.initEvents();
    }
  }

  public ngOnDestroy(): void {
    this.snackBar.dismiss();
    this.preloader.change(undefined);
    this.subscription.unsubscribe();
  }

  private initEvents(): void {
    const buildControlPipe = (fieldName: string, control: AbstractControl) =>
      control.valueChanges.pipe(debounceTime(500), map(value => ({ field: fieldName, value })), filter(() => control.valid));

    const merged = merge(
      buildControlPipe('name', this.name),
      buildControlPipe('email', this.email),
      buildControlPipe('about', this.about),
      buildControlPipe('status', this.status),
    ).subscribe((result: { field: string, value: string }) => {
      this.changeUserParam(result.field, result.value).subscribe();
    });
    this.subscription.add(merged);
  }

  public decide(index: number, group: GROUPS, status: APPROVE_STATE): void {
    if (!this.user) {
      return;
    }
    switch (group) {
      case GROUPS.PHOTO:
        this.appUserApi.updatePhoto(index, this.user._id, status).subscribe();
        const photo = (this.user.photos || [])[index];
        if (photo) {
          this.user.photos![index] = { ...photo, approved: status };
        }
        break;
      case GROUPS.CERTIFICATES:
        this.appUserApi.updateCertificate(index, this.user._id, status).subscribe();
        const certificate = (this.user.certificates || [])[index];
        if (certificate) {
          this.user.certificates![index] = { ...certificate, approved: status };
        }
        break;
      default:
        throw Error('Wrong group type, when try accept image.');
    }
  }

  public changeUserParam(field: string, value: string): Observable<IUser> {
    if (!this.user || this.user === EMPTY_USER) {
      return EMPTY;
    }

    const showErrorDialog = (errorResponse: HttpErrorResponse) => this.snackBar.open(
      errorResponse.error.message,
      'Good.'
    );
    this.loadList.add(field);
    return this.appUserApi
      .updateUser({ id: this.user!._id, [field]: value })
      .pipe(
        finalize(() => {
          this.loadList.delete(field);
        }),
        catchError((error) => {
          showErrorDialog(error);
          throw error;
        })
      );
  }
}
