import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

const accessToken = localStorage.getItem("accessToken");

const header = {
  "x-access-token": accessToken,
  "Content-Type": "application/json",
};

export const getBoards = (data) => {
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/boards`,
    headers: header,
  };
  return callApi(config);
};

export const getDetailBoard = (boardId) => {
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/board/${boardId}`,
    headers: header,
  };
  return callApi(config);
};

export const createBoard = (data) => {
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/board/create`,
    headers: header,
    data,
  };
  return callApi(config);
};
