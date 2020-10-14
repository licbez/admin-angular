import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ILocation } from './locations.interface';

export enum LANGUAGE {
  RU = 'ru',
  EN = 'en',
}

@Injectable({
  providedIn: 'root',
})
export class AppLocationsApi {
  private baseUrl = `${environment.appServerApi}/location`;

  constructor(private http: HttpClient) {
    // Empty
  }

  public all(language: LANGUAGE = LANGUAGE.RU, withClubsOnly: '0' | '1' = '0'): Observable<ILocation[]> {
    const options = { params: { withClubsOnly } };
    return this.http.get<ILocation[]>(`${this.baseUrl}/all?language=${language}`, options);
  }
}
