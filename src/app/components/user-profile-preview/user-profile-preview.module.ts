import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePreviewComponent } from './user-profile-preview.component';
import { UserProfileModule } from '../user-profile/user-profile.module';



@NgModule({
  exports: [UserProfilePreviewComponent],
  declarations: [UserProfilePreviewComponent],
  imports: [
    CommonModule,
    UserProfileModule
  ]
})
export class UserProfilePreviewModule { }
