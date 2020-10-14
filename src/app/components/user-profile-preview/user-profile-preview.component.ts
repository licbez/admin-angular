import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ITrainer } from '../../../services/api/api-app/app-user-api/user.interface';
import { EMPTY_USER } from '../../tabs/users/empty-user';
import { AppUserApiService } from '../../../services/api/api-app/app-user-api/app-user-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile-preview',
  templateUrl: './user-profile-preview.component.html',
  styleUrls: ['./user-profile-preview.component.scss']
})
export class UserProfilePreviewComponent implements OnInit, OnDestroy {
  public error!: Error;
  public user: ITrainer = EMPTY_USER;
  public subscription!: Subscription;

  constructor(
    public appUserApi: AppUserApiService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }

  public ngOnInit(): void {
    this.subscription = this.appUserApi.getById(this.data.id).subscribe((user) => {
      this.user = { ...EMPTY_USER, ...user, };
    }, this.onError.bind(this));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private onError(errorResponse: HttpErrorResponse): void {
    this.error = errorResponse.error;
  }
}
