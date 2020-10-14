import { ServerError } from './server-base.error';

export class TokenExpireError extends ServerError {
  public reason = 'TOKEN_EXPIRED';
  public status = 401;
}
