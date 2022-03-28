export * from "./errors";
import axios from "axios";

import Mainflux from "./main";

export function createMainfluxInstance(baseUrl: string): Mainflux {
  const http = axios.create({
    baseURL: baseUrl,
  });

  return new Mainflux(http);
}
