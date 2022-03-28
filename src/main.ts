import { AxiosInstance } from "axios";
import { Failable, goCatch } from "go-catch";

import { InvalidCredentialsError, UnknownError } from "./errors";

export default class Mainflux {
  constructor(private http: AxiosInstance) {}

  async signIn(email: string, password: string): Promise<Failable<string>> {
    interface Response {
      token: string;
    }

    const [response, error] = await goCatch(
      this.http.post<Response>("/tokens", {
        email,
        password,
      }),
    );

    if (error) {
      if (error.response.status === 401) {
        return [null, new InvalidCredentialsError()];
      }

      return [null, new UnknownError()];
    }

    return [response!.data.token, null];
  }
}
