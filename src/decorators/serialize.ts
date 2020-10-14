import 'reflect-metadata';
import { StorageIndex } from '../app/app.constants';

// tslint:disable-next-line:max-line-length
export function serialize<T>(index: StorageIndex, storage: Storage = window.localStorage, defaultValue: T | null = null): PropertyDecorator {
  const item = storage.getItem(index);
  let value: T = item ? JSON.parse(item) : defaultValue;

  return (target: any, propertyKey: string | symbol): void => {
    const update = Reflect.defineProperty(
      target,
      propertyKey,
      {
        configurable: true,
        enumerable: true,
        get: () => value,
        set: (newValue: T) => {
          if (newValue === undefined) {
            storage.removeItem(index);
            throw TypeError('Value can`t be undefined. Because undefined is not cloneable value.');
          }
          value = newValue;
          try {
            const json = JSON.stringify(value);
            storage.setItem(index, json);
          } catch (error) {
            throw Error(`Can\`t convert to json value: ${value}.`);
          }
        }
      },
    );
    if (!update) {
      throw new Error('Can`t apply serialize decorator.');
    }
  };
}
