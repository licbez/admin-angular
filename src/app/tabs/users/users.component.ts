import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserListResponse, ROLES } from 'src/services/api/api-app/app-user-api/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserProfilePreviewComponent } from '../../components/user-profile-preview/user-profile-preview.component';
import { serialize } from '../../../decorators/serialize';
import { StorageIndex } from '../../app.constants';
import { IPaginationRequest } from '../../../services/api/api-app/common.interfaces';
import { Sort } from '@angular/material/sort';
import { AppUserApiService } from '../../../services/api/api-app/app-user-api/app-user-api.service';
import { IUsersListState } from '../../components/users-list/users-list.component';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public data!: IUserListResponse;
  public lastFetchedData!: IUsersListState;

  @serialize(StorageIndex.USERS_ALL, window.localStorage, true)
  public all = true;
  private readonly subscription = new Subscription();

  public loaded!: boolean;

  constructor(
    private dialog: MatDialog,
    private userApiService: AppUserApiService,
  ) {
    // Empty
  }

  public ngOnInit(): void {
    const sort: Sort = { active: 'createdAt', direction: 'desc' };
    this.fetchData({ perPage: 30, page: 1 }, undefined, sort);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onUserSelect(id: string): void {
    this.dialog.open(UserProfilePreviewComponent, { data: { id }, maxHeight: '90vh', panelClass: 'user-profile' });
  }

  public showTrainersOnlyToggle(): void {
    this.all = !this.all;
    const paginationRequest = { perPage: this.lastFetchedData.paginationRequest.perPage, page: 1 };
    this.fetchData(paginationRequest, undefined, this.lastFetchedData.sort);
  }

  public fetchData(
    paginationRequest: IPaginationRequest,
    role: ROLES | undefined,
    sort: Sort,
  ): void {
    this.loaded = true;
    this.lastFetchedData = { paginationRequest, role, sort };
    const subscription = this.userApiService.list(paginationRequest, role, sort, !this.all)
      .pipe(finalize(() => {
        this.loaded = false;
      }))
      .subscribe(({ users, pagination }) => {
        this.data = { users, pagination, sort };
      });
    this.subscription.add(subscription);
  }
}
