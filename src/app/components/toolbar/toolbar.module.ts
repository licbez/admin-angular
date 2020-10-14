import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { SpinnerModule } from '../../ui-components/spinner/spinner.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlErrorModule } from '../../directives/control-error.directive/control-error-module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    BrowserModule,
    SpinnerModule,
    MatButtonModule,
    FlexLayoutModule,
    ControlErrorModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    SpinnerModule,
    LoginFormComponent,
    MatButtonModule,
  ],
  entryComponents: [LoginFormComponent],
  declarations: [
    LoginFormComponent,
  ],
})
export class AppToolbarModule {}
