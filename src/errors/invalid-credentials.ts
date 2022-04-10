export default class InvalidCredentialsError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidCredentialsError";
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
