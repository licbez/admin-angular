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
import {AppRoutingEnum} from '../../app-routing-enum';
import {RoutePreloaderService} from '../../../services/route-preloader.service';

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

  constructor(
    private dialog: MatDialog,
    private userApiService: AppUserApiService,
    private preloader: RoutePreloaderService,
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

  public fetchData(
    paginationRequest: IPaginationRequest,
    role: ROLES | undefined,
    sort: Sort,
  ): void {
    this.load = true;
    this.lastFetchedData = { paginationRequest, role, sort };
    const subscription = this.userApiService.list(paginationRequest, role, sort, !this.all)
      .pipe(finalize(() => {
        this.load = false;
      }))
      .subscribe(({ users, pagination }) => {
        this.data = { users, pagination, sort };
      });
    this.subscription.add(subscription);
  }

  set load(flag: boolean) {
    this.preloader.load$.next(flag ? AppRoutingEnum.USERS : undefined);
  }

  get load(): boolean {
    return this.preloader.load$.getValue() === AppRoutingEnum.USERS;
  }
}
