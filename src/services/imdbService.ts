import { CapacitorHttp, HttpResponse } from "@capacitor/core";

export class imdbService {
  constructor() {}

  //TODO: insert imdb api details here
  url = "";

  getShowDetails = async (title: string) => {
    const options = {
      url: `${this.url}`,
      headers: { "Content-Type": "application/json" },
    };
    return await CapacitorHttp.get(options);
  };
}
