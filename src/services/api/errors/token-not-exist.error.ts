import { ServerError } from './server-base.error';

export class TokenNotExistError extends ServerError {
  public reason = 'TOKEN_DOES_NOT_EXIST';
  public status = 401;
}
