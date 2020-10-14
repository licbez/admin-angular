import { ServerError } from './server-base.error';

export class NotFoundError extends ServerError {
  public reason = 'DOES_NOT_EXIST';
  public status = 404;
}
