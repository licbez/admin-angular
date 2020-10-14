import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovableImageComponent } from './approvable-image.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
  ],
  exports: [
    ApprovableImageComponent,
  ],
  declarations: [ApprovableImageComponent],
})
export class ApprovableImageModule { }
