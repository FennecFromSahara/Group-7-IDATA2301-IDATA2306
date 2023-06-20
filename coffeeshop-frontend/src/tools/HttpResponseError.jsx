/**
 * Code copied from https://github.com/strazdinsg/web-examples/blob/main/public_html/examples/react/15-react-jwt-auth/src/tools/HttpResponseError.js
 * An exception to be used for HTTP error responses
 */
export class HttpResponseError extends Error {
  /**
   * Create a new HTTP response error
   * @param {int} statusCode The Status code: 200 for OK, 404 for Not found, etc.
   * @param {string} message The message in the response body
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  /**
   * @return {int} The HTTP error code (401 unauthorized, etc)
   */
  getErrorCode() {
    return this.statusCode;
  }
}
