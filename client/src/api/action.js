import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

const accessToken = localStorage.getItem("accessToken");

const header = {
  "x-access-token": accessToken,
  "Content-Type": "application/json",
};

export const createAction = (data) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/action`,
    headers: header,
    data,
  };
  return callApi(config);
};
