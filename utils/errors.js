/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 403;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  ForbiddenError,

};
