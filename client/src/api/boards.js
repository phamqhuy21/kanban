import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

export const getBoards = () => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/boards`,
    headers: header,
  };
  return callApi(config);
};

export const getDetailBoard = (boardId) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/board/${boardId}`,
    headers: header,
  };
  return callApi(config);
};

export const createBoard = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/board/create`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const updateBoard = (boardId, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "put",
    url: `${BASE_URL}/${PATH}/board/${boardId}`,
    headers: header,
    data,
  };
  return callApi(config);
};
