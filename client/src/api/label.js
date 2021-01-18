import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

// const accessToken = localStorage.getItem("accessToken");

// const header = {
//   "x-access-token": accessToken,
//   "Content-Type": "application/json",
// };

export const getLabelsBoard = (boardId) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/label`,
    headers: header,
    params: {
      boardId,
    },
  };
  return callApi(config);
};

export const createLabel = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/label`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const deleteLabel = (labelId, boardId) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "delete",
    url: `${BASE_URL}/${PATH}/label/${labelId}`,
    headers: header,
    data: { boardId },
  };
  return callApi(config);
};

export const updateLabel = (labelId, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "put",
    url: `${BASE_URL}/${PATH}/label/${labelId}`,
    headers: header,
    data,
  };
  return callApi(config);
};
