import { IDateRange, IPagination } from '../common.interfaces';

export interface ITrainerBase {
  _id: string;
  creditCard?: string;
}

export enum TRAINING_STATUS {
  PAYED = 'PAYED',
  CANCELED = 'CANCELED',
}

export interface ITransactionBase {
  amount: number;
  orderId: string;
  trainer: string | ITrainerBase;
  _id: string;
  occurred: string; // ISO date string
  status: TRAINING_STATUS;
}

export interface ITransactionRaw extends ITransactionBase {
  client?: string[];
}

export interface ITransaction extends ITransactionBase {
  client?: string;
}

export interface ITransactionRequest {
  dates: IDateRange;
  pagination: IPagination;
}

export interface ITransactionsRawResponse {
  data: ITransactionRaw[];
  pagination: IPagination;
}

export interface ITransactionsResponse {
  data: ITransaction[];
  pagination: IPagination;
}
