/* eslint-disable max-classes-per-file */
export class ApiError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
