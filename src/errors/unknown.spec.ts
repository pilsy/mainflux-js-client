import UnknownError from "./unknown";

describe("UnknownError", () => {
  it("should be instance of UnknownError", () => {
    const error = new UnknownError();
    expect(error).toBeInstanceOf(UnknownError);
  });
});
