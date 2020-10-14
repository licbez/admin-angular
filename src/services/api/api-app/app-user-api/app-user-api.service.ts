import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILoginRequest } from './login-request.interface';
import { APPROVE_STATE, ITrainer, IUser, IUserListResponse, IUserSimple, ROLES } from './user.interface';
import { IDataToUpdateUser } from './data-to-user-update.interface';
import { IPaginationRequest } from '../common.interfaces';
import { Sort } from '@angular/material/sort';

interface IListParams {
  pagination?: IPaginationRequest;
  role?: ROLES;
  sort?: Sort;
  withoutClub: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppUserApiService {
  private baseUrl = `${environment.appServerApi}/user`;

  constructor(private http: HttpClient) {
    // Empty
  }

  public login(email: string, password: string): Observable<string> {
    return this.http.post<ILoginRequest>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(({ token }) => token),
      );
  }

  public logout(): Observable<undefined> {
    return this.http.get<undefined>(`${this.baseUrl}/logout`);
  }

  // tslint:disable-next-line:typedef
  public list(pagination: IPaginationRequest, role: ROLES | undefined, sort: Sort, withoutClub = false): Observable<IUserListResponse> {
    const body: IListParams = { pagination, withoutClub };
    if (role) {
      body.role = role;
    }
    body.sort = sort;
    const convertDate = (list: IUserListResponse): IUserListResponse => {
      list.users = list.users.map((user: IUserSimple) => {
        if (user.createdAt) {
          user.createdAt = new Date(user.createdAt).toLocaleString();
        }
        return user;
      });
      return list;
    };
    return this.http.post<IUserListResponse>(`${this.baseUrl}/list`, body).pipe(map(convertDate));
  }

  public getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }

  public updatePhoto(index: number, userId: string, status: APPROVE_STATE): Observable<undefined> {
    const body = {
      userId,
      status,
      imageIndex: index,
    };
    return this.http.put<undefined>(`${this.baseUrl}/photo`, body);
  }

  public updateCertificate(index: number, userId: string, status: APPROVE_STATE): Observable<undefined> {
    const body = {
      userId,
      status,
      imageIndex: index,
    };
    return this.http.put<undefined>(`${this.baseUrl}/certificate`, body);
  }

  public fetchUserToModerate(): Observable<ITrainer> {
    return this.http.get<ITrainer>(`${this.baseUrl}/unmoderate`);
  }

  public updateUser(data: IDataToUpdateUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}`, data);
  }
}
