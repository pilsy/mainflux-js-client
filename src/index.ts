import { Fetcher } from "openapi-typescript-fetch";
import { paths as UsersPaths } from "./generated/schemas/users";
import { paths as ThingsPaths } from "./generated/schemas/things";
import { paths as ReadersPaths } from "./generated/schemas/readers";

export interface MainfluxInstanceOptions {
  authToken?: string;
}

export function createMainfluxInstance(baseUrl: string, { authToken }: MainfluxInstanceOptions = {}) {
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
  const readersFetcher = getFetcher<ReadersPaths>();

  return {
    users: {
      createToken: usersFetcher.path("/tokens").method("post").create(),
      getProfile: usersFetcher.path("/users/profile").method("get").create(),
    },
    things: {
      list: thingsFetcher.path("/things").method("get").create(),
    },
    channels: {
      list: thingsFetcher.path("/channels").method("get").create(),
      getMessages: readersFetcher.path("/reader/channels/{chanId}/messages").method("get").create(),
    },
  };
}
