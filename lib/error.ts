/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiErrorOptions extends ErrorOptions {
  statusCode: number;
  details?: Record<string, any>;
}

export class ApiError extends Error {
  statusCode?: number;
  details?: Record<string, any>;

  constructor(message: string, options?: ApiErrorOptions) {
    super(message);
    this.name = new.target.name;
    this.statusCode = options?.statusCode;
    this.details = options?.details;

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', details?: Record<string, any>) {
    super(message, { statusCode: 400, details });
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', details?: Record<string, any>) {
    super(message, { statusCode: 401, details });
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', details?: Record<string, any>) {
    super(message, { statusCode: 403, details });
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found', details?: Record<string, any>) {
    super(message, { statusCode: 404, details });
  }
}
