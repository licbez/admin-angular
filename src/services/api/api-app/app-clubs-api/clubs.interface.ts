import { IPagination } from '../common.interfaces';

export interface IGeolocation {
  latitude: number;
  longitude: number;
}

export interface IClub {
  _id: string;
  title: string;
  address: string;
  location: string;
  trainers: string[];
  geolocation?: IGeolocation;
}

export interface IClubCreateRequest {
  title: string;
  address: string;
  location: string;
  geolocation?: IGeolocation;
}

export interface IClubUpdateRequest {
  _id?: string;
  title?: string;
  address?: string;
  location?: string;
  geolocation?: IGeolocation;
}

export interface IClubsResponse {
  clubs: IClub[];
  pagination: IPagination;
}
