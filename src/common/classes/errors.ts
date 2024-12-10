/* eslint-disable max-classes-per-file */
import type { ValidationError } from 'class-validator';

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

export class ServerError extends ApiError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export class ApiValidationError extends ApiError {
  declare data: unknown;

  constructor(errors: ValidationError[]) {
    super('Validation error');

    const strErrors = errors.reduce<string[]>((acc, error) => {
      const constraints = Object.values(error.constraints || {});

      return [...acc, ...constraints];
    }, []);

    this.message = strErrors.join('. ');

    this.data = errors.reduce<Record<string, string[]>>((acc, error) => {
      acc[error.property] = Object.values(error.constraints || {});

      return acc;
    }, {});

    Object.setPrototypeOf(this, ApiValidationError.prototype);
  }
}
