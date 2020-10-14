import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IClub, IClubCreateRequest, IClubsResponse } from './clubs.interface';
import { IUserListResponse } from '../app-user-api/user.interface';
import { IPaginationRequest } from '../common.interfaces';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class AppClubsApi {
  private baseUrl = `${environment.appServerApi}/club`;

  constructor(private http: HttpClient) {
    // Empty
  }

  public create(body: IClubCreateRequest[]): Observable<IClub> {
    return this.http.put<IClub>(`${this.baseUrl}/`, body);
  }

  public listByLocation(location: string, pagination: IPaginationRequest): Observable<IClubsResponse> {
    const body = { pagination };
    return this.http.post<IClubsResponse>(`${this.baseUrl}/${location}`, body);
  }

  public trainersForClub(clubId: string, pagination: IPaginationRequest, sort: Sort): Observable<IUserListResponse> {
    const body = { pagination, sort };
    return this.http.post<IUserListResponse>(`${this.baseUrl}/${clubId}/trainers`, body);
  }
}
