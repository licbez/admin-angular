import { errorsList, getErrorMessage } from '../../../utils/errors-list';
import { AbstractControl } from '@angular/forms';

const errors = {
  emptyResponse: 'Список локаций пуст. Вы не сможите создать клуб пока-что.',
  errorResponse: 'Сервер не отвечает.',
  mustBeSelected: 'Вы должны выбрать значение из списка.',
};

export const locationsFormErrors = { ...errorsList, ...errors };
export function getLocationsErrorMessage(control: AbstractControl): string {
  return getErrorMessage(control, locationsFormErrors);
}
