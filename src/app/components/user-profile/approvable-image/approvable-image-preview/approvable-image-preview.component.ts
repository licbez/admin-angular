import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './approvable-image-preview.component.html',
  styleUrls: ['./approvable-image-preview.component.scss'],
})
export class ApprovableImagePreviewComponent {
  constructor(
    public dialogRef: MatDialogRef<ApprovableImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string }
    ) {
  }

  public onClick(): void {
    this.dialogRef.close();
  }
}
