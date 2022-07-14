import {EventEmitter} from 'events';
import httpStatus from '../http/httpStatus.js';

export default class ErrorHandler extends EventEmitter {
  constructor(logger) {
    super();
    this.logger = logger;
    this.eventName = 'untrustedError';
    this.defaultResponse = '500 Internal Server Error';
  }

  getEventName() {
    return this.eventName;
  }

  handleError(error, response = null) {
    // logs and metrics
    this.logger.error(error, 'ErrorHandler', {isTrusted: error?.isTrusted ?? false});
    return this.crushOrSendResponse(error, response);
  }

  renderResponse(error, response) {
    return response
      .status(error?.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR)
      .json(error?.message ?? this.defaultResponse);
  }

  crushOrSendResponse(error, response) {
    if (
      response !== null &&
      typeof error?.isTrustedError === 'function' &&
      error.isTrustedError()
    ) {
      return this.renderResponse(error, response);
    }

    return this.emitCrushServer(error);
  }

  emitCrushServer(error) {
    this.emit(this.eventName, error);
  }
}
