import axios from "axios";
import nookies from "nookies";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

instance.interceptors.request.use(
  function (config: any) {
    // const token = localStorage.getItem("token");
    const cookies = nookies.get(null);

    if (cookies.token) {
      config.headers["Authorization"] = "Bearer " + cookies.token;
    }

return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);
