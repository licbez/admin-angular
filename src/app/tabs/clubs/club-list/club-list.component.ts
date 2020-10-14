import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IClubsResponse } from '../../../../services/api/api-app/app-clubs-api/clubs.interface';
import { MatDialog } from '@angular/material/dialog';
import { TrainersOfClubComponent } from '../../../components/trainers-of-club/trainers-of-club.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPaginationRequest } from '../../../../services/api/api-app/common.interfaces';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss'],
})
export class ClubListComponent implements OnInit, OnChanges {
  @Input()
  public data!: IClubsResponse;

  @Input()
  public load = false;

  @Output()
  public paginationChange = new EventEmitter<IPaginationRequest>();

  public selectedClub!: string;
  public readonly columns = ['title', 'address', 'trainers'];
  @ViewChild(MatPaginator, { static: true }) private readonly paginator!: MatPaginator;

  constructor(public readonly clubDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.paginator.initialized.subscribe(() => {
      if (!this.data) {
        return;
      }
      this.paginator.pageIndex = this.data.pagination.page - 1;
      this.paginator.length = this.data.pagination.total;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const data: IClubsResponse | undefined = changes.data && changes.data.currentValue;
    if (data !== undefined && this.paginator) {
      this.paginator.pageIndex = data.pagination.page - 1;
      this.paginator.length = data.pagination.total;
    }
  }

  public onPaginationChange(event: PageEvent): void {
    const paginationRequest = { perPage: event.pageSize, page: event.pageIndex + 1 };
    this.paginationChange.emit(paginationRequest);
  }

  public selectClub(id: string): void {
    this.selectedClub = id;
    this.clubDialog.open(
      TrainersOfClubComponent,
      { maxWidth: '98vw', maxHeight: '90vh', data: { id }, panelClass: 'club-list' }
    );
  }
}
