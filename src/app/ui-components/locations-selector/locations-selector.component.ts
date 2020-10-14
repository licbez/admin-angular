import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  LANGUAGE,
  AppLocationsApi,
} from '../../../services/api/api-app/app-locations-api/app-locations-api.service';
import { map, startWith } from 'rxjs/operators';
import { ILocation } from '../../../services/api/api-app/app-locations-api/locations.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { getLocationsErrorMessage } from './locations-selector.error-list';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';

export interface ILocationsGroup {
  letter: string;
  locations: ILocation[];
}

export interface ILocationSelectEvent {
  id: string;
  value: string;
}

export const filterLocations = (locations: ILocation[], value: string): ILocation[] => {
  const filterValue = value.toLowerCase();

  return locations.filter(item => item.title.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-locations-selector',
  templateUrl: './locations-selector.component.html',
  styleUrls: ['./locations-selector.component.scss']
})
export class LocationsSelectorComponent implements OnInit, OnDestroy {
  @Output()
  private locationChange = new EventEmitter<ILocationSelectEvent | undefined>();

  @Input()
  public required = true;

  @Input()
  public locationId: string | undefined;

  @Input()
  public withClubs = false;

  @ViewChild(MatAutocompleteTrigger)
  private completeTrigger!: MatAutocompleteTrigger;

  public readonly form: FormGroup;
  public getErrorMessage = getLocationsErrorMessage;
  public readonly locationsControl: AbstractControl;
  public locationsGroups!: ILocationsGroup[];
  public stateGroupOptions!: Observable<ILocationsGroup[]>;
  private readonly subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private locationsApi: AppLocationsApi,
  ) {
    this.locationsControl = new FormControl('');
    this.form = new FormGroup({
      locationsControl: this.locationsControl
    });
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public fetchData(): void {
    let subscription = this.locationChange.subscribe((value: ILocationSelectEvent | undefined) => {
      if (value) {
        this.locationId = value.id;
      }
    });
    this.subscription.add(subscription);

    subscription = this.locationsApi.all(LANGUAGE.RU, this.withClubs ? '1' : '0')
      .pipe(map<ILocation[], ILocationsGroup[]>(list => {
        const locationsByFirstLetter = new Map<string, ILocation[]>();
        for (const location of list) {
          const letter = location.title[0].toUpperCase();
          if (!locationsByFirstLetter.has(letter)) {
            locationsByFirstLetter.set(letter, [location]);
          } else {
            locationsByFirstLetter.get(letter)!.push(location);
          }
        }
        const result: ILocationsGroup[] = Array.from(locationsByFirstLetter)
          .map(([letter, locations]) => ({ letter, locations }));
        return result;
      })).subscribe((list) => this.onSuccess(list), () => this.onError());
    this.subscription.add(subscription);
  }

  public locationSelect(event: MatAutocompleteSelectedEvent): void {
    this.locationChange.emit({ id: event.option.id, value: event.option.value });
  }

  public reset(): void {
    if (this.locationId) {
      this.locationChange.emit(undefined);
    }
  }

  public onLocationSearchFocusLost(): void {
    if (!this.locationId && (this.required || this.locationsControl.value)) {
      this.locationsControl.setErrors({ mustBeSelected: true });
      this.locationsControl.markAllAsTouched();
    }
  }

  private onSuccess(list: ILocationsGroup[]): void {
    if (!list.length) {
      this.locationsControl.setErrors({ emptyResponse: true });
      this.locationsControl.markAllAsTouched();
    }
    this.locationsGroups = list;
    this.stateGroupOptions = this.locationsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterGroup(value))
      );

    if (!this.locationId) {
      return;
    }
    window.requestAnimationFrame(() => {
      const autocomplete = this.completeTrigger.autocomplete;
      const item = autocomplete.options.find((option: MatOption) => option.id === this.locationId);
      if (!item) {
        return;
      }

      this.locationsControl.markAsDirty();
      this.completeTrigger.writeValue(item.value);
      autocomplete.optionSelected.emit({ source: autocomplete, option: item });
    });
  }

  private onError(): void {
    this.locationsGroups = [];
    this.locationsControl.setErrors({ errorResponse: true });
    this.locationsControl.markAllAsTouched();
  }

  private filterGroup(value: string): ILocationsGroup[] {
    if (!this.locationsGroups) {
      return [];
    }
    if (value) {
      return this.locationsGroups
        .map(group => ({ letter: group.letter, locations: filterLocations(group.locations, value) }))
        .filter(group => group.locations.length > 0);
    }

    return this.locationsGroups;
  }
}
