import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

// const accessToken = localStorage.getItem("accessToken");

// const header = {
//   "x-access-token": accessToken,
//   "Content-Type": "application/json",
// };

export const createComment = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/comment`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const updateComment = (commentId, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "put",
    url: `${BASE_URL}/${PATH}/comment/${commentId}`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const deleteComment = (commentId, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "delete",
    url: `${BASE_URL}/${PATH}/comment/${commentId}`,
    headers: header,
    data,
  };
  return callApi(config);
};
