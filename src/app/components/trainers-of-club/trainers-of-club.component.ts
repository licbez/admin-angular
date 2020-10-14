import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppClubsApi } from '../../../services/api/api-app/app-clubs-api/app-clubs-api.service';
import { IUserListResponse } from '../../../services/api/api-app/app-user-api/user.interface';
import { IPaginationRequest } from '../../../services/api/api-app/common.interfaces';
import { Sort } from '@angular/material/sort';
import { UserProfilePreviewComponent } from '../user-profile-preview/user-profile-preview.component';
import { IUsersListState } from '../users-list/users-list.component';
import { delay } from 'rxjs/operators';

@Component({
  templateUrl: './trainers-of-club.component.html',
  styleUrls: ['./trainers-of-club.component.scss']
})
export class TrainersOfClubComponent implements OnInit, OnDestroy {
  public subscription!: Subscription;
  public data!: IUserListResponse;

  constructor(
    private dialog: MatDialog,
    public appClubApi: AppClubsApi,
    @Inject(MAT_DIALOG_DATA) public dialogData: { id: string }
  ) {
  }

  public ngOnInit(): void {
    const sort: Sort = { active: 'createdAt', direction: 'desc' };
    this.fetchData({ perPage: 30, page: 1 }, sort);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public userSelect(id: string): void {
    this.dialog.open(
      UserProfilePreviewComponent,
      { data: { id }, maxHeight: '90vh', panelClass: 'user-profile' }
    );
  }

  public listChange(state: IUsersListState): void {
    this.fetchData(state.paginationRequest, state.sort);
  }

  private fetchData(paginationRequest: IPaginationRequest, sort: Sort): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.appClubApi.trainersForClub(this.dialogData.id, paginationRequest, sort)
      .pipe(delay(500))
      .subscribe((response) => {
        this.data = { users: response.users, sort: response.sort, pagination: response.pagination };
      });
  }
}
