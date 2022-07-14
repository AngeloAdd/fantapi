import APIError from './APIError.js';
import httpStatus from '../httpStatus.js';

export default class NotFoundError extends APIError {
  constructor(message = '404 Resource not found', isOperational = true) {
    super(message, httpStatus.NOT_FOUND, isOperational);
    this.name = 'HttpNotFound';
  }
}
