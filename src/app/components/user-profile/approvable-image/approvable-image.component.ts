import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APPROVE_STATE, IProvableImage } from 'src/services/api/api-app/app-user-api/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ApprovableImagePreviewComponent } from './approvable-image-preview/approvable-image-preview.component';

interface IIcon {
  content: string;
  color: string;
}

@Component({
  selector: 'app-approvable-image',
  templateUrl: './approvable-image.component.html',
  styleUrls: ['./approvable-image.component.scss'],
})
export class ApprovableImageComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  @Input()
  public readonly content?: IProvableImage;

  @Output()
  public readonly accept = new EventEmitter<undefined>();

  @Output()
  public readonly refusal = new EventEmitter<undefined>();

  public icon?: IIcon;

  /** Pass enums */
  public APPROVE_STATE = APPROVE_STATE;

  public ngOnInit(): void {
    if (this.content?.approved !== undefined) {
      this.icon = getIcon(this.content.approved);
    }
  }

  public showFullSize(): void {
    if (!this.content) {
      return;
    }
    this.dialog.open(ApprovableImagePreviewComponent, {
      data: { url: this.content.url },
    });
  }

  public onClick(approve: boolean = true): void {
    if (approve) {
      this.accept.emit();
    } else {
      this.refusal.emit();
    }
  }
}

function getIcon(type: APPROVE_STATE): IIcon | undefined {
  switch (type) {
    case APPROVE_STATE.ACCEPT:
      return { content: 'done', color: 'primary' };
    case APPROVE_STATE.DECLINE:
      return { content: 'close', color: 'warn' };
    default:
      return undefined;
  }
}
