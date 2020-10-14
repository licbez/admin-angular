import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApprovableImageModule } from './approvable-image/approvable-image.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { InputLoaderDirective } from '../../directives/input-loader.directive';
import { UserProfileComponent } from './user-profile.component';
import { SpinnerModule } from '../../ui-components/spinner/spinner.module';
import { MatIconModule } from '@angular/material/icon';
import { ControlErrorModule } from '../../directives/control-error.directive/control-error-module';



@NgModule({
  exports: [UserProfileComponent],
  declarations: [InputLoaderDirective, UserProfileComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ApprovableImageModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    SpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    ControlErrorModule,
  ],
})
export class UserProfileModule { }
