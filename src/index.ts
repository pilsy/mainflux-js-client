import { Fetcher } from "openapi-typescript-fetch";
import { paths as UsersPaths } from "./generated/schemas/users";
import { paths as ThingsPaths } from "./generated/schemas/things";

interface Params {
  authToken?: string;
}

export function createMainfluxInstance(baseUrl: string, { authToken }: Params = {}) {
  function getFetcher<P>() {
    const fetcher = Fetcher.for<P>();

    fetcher.configure({
      baseUrl,
      ...(authToken && {
        init: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      }),
    });

    return fetcher;
  }

  const usersFetcher = getFetcher<UsersPaths>();
  const thingsFetcher = getFetcher<ThingsPaths>();

  return {
    users: {
      createToken: usersFetcher.path("/tokens").method("post").create(),
    },
    things: {
      list: thingsFetcher.path("/things").method("get").create(),
    },
  };
}
