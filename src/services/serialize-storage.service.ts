import { Injectable } from '@angular/core';
import { StorageIndex } from '../app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SerializeStorageService {
  private storage: Storage = window.localStorage;

  public setItem(index: StorageIndex, value: any): void | never {
    if (value === undefined) {
      return this.deleteItem(index);
    }
    const json = JSON.stringify(value);
    this.storage.setItem(index, json);
  }

  public getItem<T>(index: StorageIndex): T | undefined {
    const item = this.storage.getItem(index);
    return item ? JSON.parse(item) : undefined;
  }

  public deleteItem(index: StorageIndex): void {
    this.storage.removeItem(index);
  }
}
