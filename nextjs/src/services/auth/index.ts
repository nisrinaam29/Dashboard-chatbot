import type { LoginData } from "@/types/UserTypes";
import { instance } from "../axios";
import { postLoginPath, postLogoutPath } from "../path";

export const postLoginService = async (data: LoginData) => {
  return instance({
    url: postLoginPath,
    method: "POST",
    data,
  })
    .then((res) => res.data)
    .catch((err) => {
      throw(err.response.data)
    });
};


export const postLogoutService = async () => {
  return instance({
    url: postLogoutPath,
    method: "POST",
  })
    .then((res) => res.data)
    .catch((err) => {
      throw(err.response.data)
    });
};
