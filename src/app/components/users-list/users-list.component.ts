import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  IUserListResponse,
  IUserSimple,
  ROLES,
} from '../../../services/api/api-app/app-user-api/user.interface';
import { TableAnimations } from '../../animations/table.animations';
import { IPaginationRequest } from '../../../services/api/api-app/common.interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

export interface IUsersListState {
  paginationRequest: IPaginationRequest;
  role: ROLES | undefined;
  sort: Sort;
}

const basePagination: IPaginationRequest = { perPage: 30, page: 0 };
const ALL_ROLE_SELECTOR = 'ALL';
const ROLES_IN_SELECT: [string, ROLES, ROLES] = [ALL_ROLE_SELECTOR, ROLES.CLIENT, ROLES.TRAINER];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: TableAnimations,
})
export class UsersListComponent implements OnInit, OnChanges {
  @Output()
  public selectUser = new EventEmitter<string>();

  @Output()
  public stateChange = new EventEmitter<IUsersListState>();

  @Input()
  private data!: IUserListResponse;

  @Input()
  public load = true;

  @Input()
  public hideRoles = false;

  public usersDataSource = new MatTableDataSource<IUserSimple>([]);
  public selectedUser: string | undefined;
  public basePagination: IPaginationRequest = basePagination;
  private readonly allColumns: string[] = ['phone', 'createdAt', 'role', 'name'];
  public columns: string[] = [];
  private roleIndex = 0;

  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;

  constructor() {
    this.rebuildColumns();
  }

  public ngOnInit(): void {
    // Empty
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const data: IUserListResponse | undefined = changes.data && changes.data.currentValue;
    if (data !== undefined) {
      this.usersDataSource.data = data.users;
      this.paginator.pageIndex = data.pagination.page - 1;
      this.paginator.length = data.pagination.total;
    }

    const hideRoles = changes.hideRoles;
    if (hideRoles && hideRoles.currentValue !== hideRoles.previousValue) {
      this.rebuildColumns();
    }
  }

  get selectedRole(): string {
    return ROLES_IN_SELECT[this.roleIndex];
  }

  public roleClick(): void {
    this.roleIndex = (this.roleIndex + 1) % ROLES_IN_SELECT.length;
    this.stateChange.emit({ paginationRequest: this.paginationData, role: this.role, sort: this.data.sort });
  }

  public sortData(sort: Sort): void {
    this.stateChange.emit({ paginationRequest: this.paginationData, role: this.role, sort });
  }

  public onPaginationChange(event: PageEvent): void {
    const paginationRequest = { perPage: event.pageSize, page: event.pageIndex + 1 };
    this.stateChange.emit({ paginationRequest, role: this.role, sort: this.data.sort });
  }

  private rebuildColumns(): void {
    this.columns = this.hideRoles
      ? this.allColumns.filter(name => name !== 'role')
      : this.allColumns;
  }

  private get role(): ROLES | undefined {
    return ROLES_IN_SELECT[this.roleIndex] === ALL_ROLE_SELECTOR ? undefined : ROLES_IN_SELECT[this.roleIndex] as ROLES;
  }

  private get paginationData(): IPaginationRequest {
    return { perPage: this.paginator.pageSize, page: 1 + this.paginator.pageIndex };
  }
}
