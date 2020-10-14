import { ServerError } from './server-base.error';

export class ValidationError extends ServerError {
  public reason = 'VALIDATION_FAIL';
  public status = 422;
}
