import NotFoundError from '../errors/NotFoundError.js';

const handleNotFoundMiddleware = () => {
  throw new NotFoundError();
};

export default handleNotFoundMiddleware;
