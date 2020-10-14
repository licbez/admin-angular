import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainersOfClubComponent } from './trainers-of-club.component';
import { UsersListModule } from '../users-list/users-list.module';
import { UserProfilePreviewModule } from '../user-profile-preview/user-profile-preview.module';

@NgModule({
  exports: [TrainersOfClubComponent],
  declarations: [TrainersOfClubComponent],
  imports: [
    CommonModule,
    UsersListModule,
    UserProfilePreviewModule,
  ],
})
export class TrainersOfClubModule { }
