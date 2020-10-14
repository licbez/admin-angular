import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    SpinnerComponent,
  ],
  declarations: [
    SpinnerComponent,
  ],
})
export class SpinnerModule {}
