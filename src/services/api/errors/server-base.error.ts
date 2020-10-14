interface IErrorWithStatus {
  reason: string;
  status: number;
}

export abstract class ServerError extends Error implements IErrorWithStatus {
  public abstract reason: string;
  public abstract status: number;

  public equals(error: IErrorWithStatus): boolean {
    return this.status === error.status && this.reason === error.reason;
  }
}
