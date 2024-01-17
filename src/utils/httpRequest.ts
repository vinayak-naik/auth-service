import axios from "axios";

export const httpRequest = async (method: string, url: string, data = {}) => {
  const options = {
    url,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data,
  };
  const response = await axios.request(options);
  return response;
};
