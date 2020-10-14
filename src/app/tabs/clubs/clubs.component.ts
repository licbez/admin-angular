import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClubAddComponent } from './club-add/club-add.component';
import { serialize } from '../../../decorators/serialize';
import { StorageIndex } from '../../app.constants';
import {
  ILocationSelectEvent,
  LocationsSelectorComponent
} from '../../ui-components/locations-selector/locations-selector.component';
import { IClubsResponse } from '../../../services/api/api-app/app-clubs-api/clubs.interface';
import { AppClubsApi } from '../../../services/api/api-app/app-clubs-api/app-clubs-api.service';
import { Subscription } from 'rxjs';
import { IPaginationRequest } from '../../../services/api/api-app/common.interfaces';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements /*OnInit, */OnDestroy {

  @serialize(StorageIndex.LOCATION)
  public locationId!: string | null;
  public data: IClubsResponse | undefined;
  public error!: Error;
  public subscription = new Subscription();

  @ViewChild(LocationsSelectorComponent) private locationSelector!: LocationsSelectorComponent;

  constructor(
    public readonly clubDialog: MatDialog,
    private readonly appClubsApi: AppClubsApi
  ) {
    // Empty
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public paginationChange(pagination: IPaginationRequest): void {
    if (this.locationId) {
      this.fetchClubs(this.locationId, pagination);
    }
  }

  public locationChange(location: ILocationSelectEvent | undefined): void {
    const id = location && location.id || null;
    if (!id || this.data && id === this.locationId) {
      return;
    }
    this.locationId = id;
    if (this.locationId) {
      this.fetchClubs(this.locationId, { perPage: 30, page: 1 });
    }
  }

  public openDialog(): void {
    const ref = this.clubDialog.open(ClubAddComponent, { width: '250px' });
    ref.afterClosed().subscribe(() => {
      this.locationSelector.fetchData();
    });
  }

  public fetchClubs(location: string, paginationRequest: IPaginationRequest): void {
    this.subscription.unsubscribe();
    this.subscription = this.appClubsApi.listByLocation(location, paginationRequest)
      .subscribe((response) => {
        this.data = response;
      }, error => this.error = error);
  }
}
