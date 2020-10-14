import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  public canActivate(): boolean {
    const result = this.auth.getToken();
    if (!result) {
      this.router.navigate(['']);
    }
    return !!result;
  }
}
