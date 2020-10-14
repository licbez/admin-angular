import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUserApiService } from '../../../services/api/api-app/app-user-api/app-user-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotFoundError } from '../../../services/api/errors/not-found.error';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutePreloaderService } from '../../../services/route-preloader.service';
import { ITrainer, ROLES } from '../../../services/api/api-app/app-user-api/user.interface';
import { EMPTY_USER } from '../users/empty-user';
import { AppRoutingEnum } from '../../app-routing-enum';

@Component({
  selector: 'app-users-moderate',
  templateUrl: './users-moderate.component.html',
  styleUrls: ['./users-moderate.component.scss']
})
export class UsersModerateComponent implements OnInit, OnDestroy {
  public noUserForModeration = false;
  public user: ITrainer | undefined;

  constructor(
    private appUserApi: AppUserApiService,
    private snackBar: MatSnackBar,
    private preloader: RoutePreloaderService,
  ) { }

  public ngOnInit(): void {
    this.nextUser();
  }

  public ngOnDestroy(): void {
    this.snackBar.dismiss();
    this.load = false;
  }

  public onError(errorResponse: HttpErrorResponse): void {
    this.load = false;
    this.noUserForModeration = new NotFoundError().equals(errorResponse.error);
    this.user = undefined;
    if (this.noUserForModeration) {
      return;
    }

    this.snackBar.open('Server is down.', 'Good.');
  }

  public nextUser(): void {
    this.load = true;
    const oldId = this.user?._id;
    this.appUserApi.fetchUserToModerate().subscribe((user) => {
      this.load = false;
      if (user._id === oldId) {
        this.snackBar.open(
          'For moderation available only this user.',
          'Good.'
        );
        return;
      }

      if (user.role === ROLES.TRAINER) {
        this.user = user;
      }
      this.user = { ...EMPTY_USER, ...user, };
      this.noUserForModeration = false;
    }, this.onError.bind(this));
  }

  set load(flag: boolean) {
    if (flag) {
      this.preloader.change(AppRoutingEnum.USERS_MODERATE);
    } else {
      this.preloader.change(undefined);
    }
  }

  get load(): boolean {
    return this.preloader.get().getValue() === AppRoutingEnum.USERS_MODERATE;
  }
}
