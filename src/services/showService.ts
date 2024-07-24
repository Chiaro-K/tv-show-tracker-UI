import { request } from "react-request-hook";

export const showService = {
  getUserShows: () => {
    return request<any[]>({
      method: "GET",
      url: `shows`,
    });
  },

  removeShow: (showId: string) => {
    return request<any>({
      method: "DELETE",
      url: `shows/${showId}`,
    });
  },
};
