import { IPagination } from '../common.interfaces';
import { Sort } from '@angular/material/sort';

export enum USER_STATUS {
  APPROVED = 0,
  PENDING,
  BLOCKED,
  MAX,
}

export enum APPROVE_STATE {
  PENDING = 0,
  ACCEPT = 1,
  DECLINE = 2,
}

export enum ROLES {
  ADMINISTRATOR = 'ADMINISTRATOR',
  TRAINER = 'TRAINER',
  CLIENT = 'CLIENT',
}

export interface ITrainer extends IUser {
  photos?: IProvableImage[];
  certificates?: IProvableImage[];
  additional?: IAdditionalInfo;
}

export interface IUser extends IUserSimple {
  certified: boolean;
  status: USER_STATUS;
  about?: string;
}

export interface IUserSimple {
  _id: string;
  phone: string;
  createdAt?: string;
  avatar?: string;
  role: ROLES;
}

export interface IProvableImage {
  approved: APPROVE_STATE;
  url: string;
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IAdditionalInfo {
  gender?: GENDER;
  name?: string;
  location?: string;
  birthday?: number;
  email?: string;
}

export interface IUserListResponse {
  pagination: IPagination;
  sort: Sort;
  users: IUserSimple[];
}
