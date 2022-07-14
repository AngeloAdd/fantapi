export default class BaseError extends Error {
  constructor(message, isOperational) {
    super(message);
    this.name = 'BaseError';
    this.isOperational = isOperational;
  }

  isTrustedError() {
    return this.isOperational;
  }
}
