import { AbstractControl } from '@angular/forms';

export const errorsList: {[key: string]: string } = {
  email: 'Not a valid email',
  required: 'You must enter a value',
  minlength: 'You must enter longer value',
  wrongEmail: 'Wrong password or email',
};

export function getErrorMessage(control: AbstractControl, list: {[key: string]: string } = errorsList): string {
  for (const ruleName of Object.keys(list)) {
    if (control.hasError(ruleName)) {
      return list[ruleName] || '';
    }
  }

  return '';
}
