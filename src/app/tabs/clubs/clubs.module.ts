import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs.component';
import { ClubsRoutingModule } from './clubs-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ClubAddComponent } from './club-add/club-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersModule } from '../users/users.module';
import { LocationsSelectorModule } from '../../ui-components/locations-selector/locations-selector.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerModule } from '../../ui-components/spinner/spinner.module';
import { ClubListModule } from './club-list/club-list.module';
import { ControlErrorModule } from '../../directives/control-error.directive/control-error-module';

@NgModule({
  declarations: [ClubsComponent, ClubAddComponent],
  imports: [
    CommonModule,
    ClubsRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    UsersModule,
    LocationsSelectorModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    SpinnerModule,
    ClubListModule,
    ControlErrorModule,
  ],
})
export class ClubsModule { }
