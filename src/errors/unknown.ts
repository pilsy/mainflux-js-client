export default class UnknownError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnknownError";
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}
