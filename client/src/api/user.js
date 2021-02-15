import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

const header = {
  "Content-Type": "application/json",
};

export const signUp = (data) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/auth/signup`,
    headers: header,
    data: { ...data, roles: ["user"] },
  };
  return callApi(config);
};

export const signIn = (data) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/auth/signin`,
    headers: header,
    data: { ...data, roles: ["user"] },
  };
  return callApi(config);
};

export const getUser = () => {
  const accessToken = localStorage.getItem("accessToken");
  let header = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    header = {
      "x-access-token": accessToken,
      "Content-Type": "application/json",
    };
  }
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/getUser`,
    headers: header,
  };
  return callApi(config);
};

export const updateUser = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  let header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/user`,
    headers: header,
    data,
  };
  return callApi(config);
};
