// eslint-disable-next-line no-unused-vars
export default (errorHandler) => (err, req, res, next) => errorHandler.handleError(err, res);
