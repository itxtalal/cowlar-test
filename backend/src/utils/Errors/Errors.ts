class CustomError extends Error {
  status: number;
  description: string;
  constructor(name: string, message: string, status: number) {
    super(message);
    this.name = name;
    this.message = message;
    this.status = status;
    this.description = message;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class ResourceNotFoundError extends Error {
  status: number;
  description: string;
  constructor(message: string) {
    super(message);
    this.name = 'ResourceNotFoundError';
    this.message = message;
    this.description = message;
    this.status = 404;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class InternalServerError extends Error {
  status: number;
  description: string;
  constructor() {
    let message =
      'Something went wrong when trying to process you request. Please try again';
    super(message);
    this.name = 'InternalServerError';
    this.message = message;
    this.status = 500;
    this.description = message;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnAuthorizedError extends CustomError {
  constructor() {
    super('UnAuthorizedError', 'UnAuthorized', 401);
  }
}

export {
  ResourceNotFoundError,
  CustomError,
  InternalServerError,
  UnAuthorizedError,
};
