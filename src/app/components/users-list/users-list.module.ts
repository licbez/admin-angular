import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { MatTableModule } from '@angular/material/table';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SpinnerModule } from '../../ui-components/spinner/spinner.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [UsersListComponent],
  exports: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FlexModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    SpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatSortModule,
  ],
})
export class UsersListModule { }
