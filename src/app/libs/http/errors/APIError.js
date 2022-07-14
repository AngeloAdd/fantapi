import BaseError from './BaseError.js';

export default class APIError extends BaseError {
  constructor(message, status, isOperational) {
    super(message, isOperational);
    this.name = 'APIError';
    this.status = status;
  }
}
