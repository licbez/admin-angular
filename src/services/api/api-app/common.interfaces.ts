export interface IDateRange {
  from: string; // expect date in string 2019-06-07
  to: string; // expect date in string 2019-06-07
}

export interface IPaginationRequest {
  perPage: number;
  page: number; // start from 1
}

export interface IPagination extends IPaginationRequest {
  total: number;
  pages: number;
}
