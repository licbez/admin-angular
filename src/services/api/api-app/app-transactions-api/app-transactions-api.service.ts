import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ITransaction,
  ITransactionsRawResponse,
  ITransactionsResponse
} from './transactions.interface';
import { IDateRange, IPaginationRequest } from '../common.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppTransactionsApi {
  private baseUrl = `${environment.appServerApi}/transactions`;

  constructor(private http: HttpClient) {
    // Empty
  }

  public transactions(dates: IDateRange, pagination: IPaginationRequest): Observable<ITransactionsResponse> {
    const convector = (response: ITransactionsRawResponse): ITransactionsResponse => {
      const data: ITransaction[] = response.data.map(transaction => {
        transaction.occurred = new Date(transaction.occurred)
          .toLocaleDateString('ru', { hour: '2-digit', minute: '2-digit' });
        const localTransaction = transaction.client && Array.isArray(transaction.client)
          ? { ...transaction, client: transaction.client[0] }
          : transaction as ITransaction;
        return localTransaction;
      });

      return { data, pagination: response.pagination };
    };

    return this.http.post<ITransactionsRawResponse>(`${this.baseUrl}`, { dates, pagination })
      .pipe(map(convector));
  }
}
