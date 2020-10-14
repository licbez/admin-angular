import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubListComponent } from './club-list.component';
import { SpinnerModule } from '../../../ui-components/spinner/spinner.module';
import { MatTableModule } from '@angular/material/table';
import { TrainersOfClubModule } from '../../../components/trainers-of-club/trainers-of-club.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ClubListComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    MatTableModule,
    TrainersOfClubModule,
    MatPaginatorModule
  ],
  exports: [ClubListComponent]
})
export class ClubListModule {
}
