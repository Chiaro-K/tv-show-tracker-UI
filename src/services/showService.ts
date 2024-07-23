import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import config from "../loader";

export class showService {
  constructor() {}

  url = config.baseUri;

  getUserShows = async () => {
    const options = {
      url: `${this.url}/shows`,
      headers: { "Content-Type": "application/json" },
    };
    return await CapacitorHttp.get(options);
  };
}
