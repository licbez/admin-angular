import { Injectable } from '@angular/core';
import { IAdministrator } from './administrator.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppUserApiService } from '../api/api-app/app-user-api/app-user-api.service';
import { map, skip } from 'rxjs/operators';
import { StorageIndex } from 'src/app/app.constants';
import { SerializeStorageService } from '../serialize-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUser$: BehaviorSubject<IAdministrator | undefined>;

  constructor(
    private api: AppUserApiService,
    private serializeStorage: SerializeStorageService,
    public router: Router,
  ) {
    this.currentUser$ = new BehaviorSubject(serializeStorage.getItem(StorageIndex.USER));
    this.currentUser$.pipe(skip(1)).subscribe(value => {
      serializeStorage.setItem(StorageIndex.USER, value);
    });
  }

  public auth(email: string, password: string): Observable<undefined> {
    return this.api.login(email, password).pipe(
      map((token: string) => {
        const user = { email, token };
        this.currentUser$.next(user);
        return undefined;
      }),
    );
  }

  public watch(): Subject<IAdministrator | undefined> {
    return this.currentUser$;
  }

  public getToken(): string | undefined {
    const value = this.currentUser$.getValue();
    return value && value.token;
  }

  public logOut(): void {
    this.currentUser$.next(undefined);
    this.router.navigate(['']);
  }
}
