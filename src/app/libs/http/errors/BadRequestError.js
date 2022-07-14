import APIError from './APIError.js';
import httpStatus from '../httpStatus.js';

export default class BadRequestError extends APIError {
  constructor(message = '400 Bad Request', isOperational = true) {
    super(message, httpStatus.BAD_REQUEST, isOperational);
    this.name = 'HttpBadRequest';
  }
}
