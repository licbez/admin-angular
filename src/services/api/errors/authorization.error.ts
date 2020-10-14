import { ServerError } from './server-base.error';

export class AuthorizationError extends ServerError {
  public reason = 'TOKEN_NEED';
  public status = 401;
}
