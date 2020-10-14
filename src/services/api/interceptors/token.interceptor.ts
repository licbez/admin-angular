import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from 'src/services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorizationError } from '../errors/authorization.error';
import { TokenExpireError } from '../errors/token-expire.error';
import { TokenNotExistError } from '../errors/token-not-exist.error';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();

    if (!token) {
      return next.handle(request);
    }

    request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errors = [new TokenExpireError(), new AuthorizationError(), new TokenNotExistError()];
        if (errors.some(localError => localError.equals(errorResponse.error))) {
          this.auth.logOut();
        }
        return throwError(errorResponse);
      })
    );
  }
}
