import InvalidCredentialsError from "./invalid-credentials";

describe("InvalidCredentialsError", () => {
  it("should be instance of InvalidCredentialsError", () => {
    const error = new InvalidCredentialsError();
    expect(error).toBeInstanceOf(InvalidCredentialsError);
  });
});
