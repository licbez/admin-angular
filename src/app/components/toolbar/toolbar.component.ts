import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { IAdministrator } from 'src/services/auth/administrator.interface';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class AppToolbarComponent {
  @Input()
  public title?: string;
  public readonly owner$: Subject<IAdministrator | undefined>;

  constructor(private authService: AuthService, private dialog: MatDialog) {
    this.owner$ = authService.watch();
  }

  public openLoginForm(): void {
    this.dialog.open(LoginFormComponent, {
      width: '250px',
    });
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
