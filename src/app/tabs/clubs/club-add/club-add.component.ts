import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppClubsApi } from '../../../../services/api/api-app/app-clubs-api/app-clubs-api.service';
import { IClubCreateRequest } from '../../../../services/api/api-app/app-clubs-api/clubs.interface';
import {
  ILocationSelectEvent,
  LocationsSelectorComponent,
} from '../../../ui-components/locations-selector/locations-selector.component';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

const isClubsEqual = (club: IClubCreateRequest, toCompare: IClubCreateRequest) =>
  club.location === toCompare.location && club.address === toCompare.address && club.title === toCompare.title;

@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.scss']
})
export class ClubAddComponent implements OnDestroy {
  public readonly title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public readonly address = new FormControl('', [Validators.required, Validators.minLength(3)]);

  @ViewChild(LocationsSelectorComponent)
  private locationComponent!: LocationsSelectorComponent;

  public subscription = new Subscription();
  private locationId: string | undefined;
  private lastAddedClub?: IClubCreateRequest;
  public load = false;

  constructor(
    private clubsApi: AppClubsApi,
    private snackBar: MatSnackBar,
  ) {
    // Empty
  }

  public locationChange(value: ILocationSelectEvent | undefined): void {
    this.locationId = value && value.id;
  }

  public create(): void {
    const { form } = this.locationComponent;
    if (this.title.invalid || this.address.invalid || form.invalid || !this.locationId) {
      [this.address, this.title, form].forEach(control => control.markAllAsTouched());
      return;
    }

    const body: IClubCreateRequest = {
      title: this.title.value,
      address: this.address.value,
      location: this.locationId
    };

    if (this.lastAddedClub && isClubsEqual(body, this.lastAddedClub)) {
      this.snackBar.open('You have already added this a club.', 'Ok');
      return;
    }
    this.load = true;
    const subscription = this.clubsApi.create([body])
      .pipe(finalize(() => this.load = false))
      .subscribe(() => this.onSuccess(body), () => this.onError());
    this.subscription.add(subscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private onSuccess(body: IClubCreateRequest): void {
    this.lastAddedClub = body;
    this.snackBar.open(`Club ${body.title} was created.`, 'Ok');
  }

  private onError(): void {
    this.snackBar.open(
      'Unable to create club. The server is behaving unpredictably, contact support.',
      'Ok',
    );
  }
}
