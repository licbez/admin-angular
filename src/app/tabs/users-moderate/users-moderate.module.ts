import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModerateComponent } from './users-moderate.component';
import { UsersModerateRoutingModule } from './users-moderate-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserProfileModule } from '../../components/user-profile/user-profile.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UsersModerateComponent],
  imports: [
    CommonModule,
    UsersModerateRoutingModule,
    FlexLayoutModule,
    UserProfileModule,
    MatButtonModule,
  ],
})
export class UsersModerateModule { }
