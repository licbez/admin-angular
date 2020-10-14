import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SpinnerModule } from '../../ui-components/spinner/spinner.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileModule } from '../../components/user-profile/user-profile.module';
import { UsersListModule } from '../../components/users-list/users-list.module';
import { UserProfilePreviewModule } from '../../components/user-profile-preview/user-profile-preview.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    UserProfileModule,
    FormsModule,
    MatExpansionModule,
    UsersListModule,
    SpinnerModule,
    UserProfilePreviewModule,
  ],
  declarations: [UsersComponent],
})
export class UsersModule {
}
