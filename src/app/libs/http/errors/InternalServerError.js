import APIError from './APIError.js';
import httpStatus from '../httpStatus.js';

export default class InternalServerError extends APIError {
  constructor(message = '500 Internal Server Error', isOperational = true) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR, isOperational);
    this.name = 'HttpInternalServerErrorException';
  }
}
