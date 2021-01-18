import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

// const accessToken = localStorage.getItem("accessToken");

// const header = {
//   "x-access-token": accessToken,
//   "Content-Type": "application/json",
// };

export const createList = (boardId, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/list/create`,
    headers: header,
    params: {
      boardId: boardId,
    },
    data,
  };
  return callApi(config);
};

export const deleteList = (boardId, listId) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "delete",
    url: `${BASE_URL}/${PATH}/list/${listId}`,
    headers: header,
    params: {
      boardId: boardId,
    },
  };
  return callApi(config);
};

export const updatePositionCards = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "put",
    url: `${BASE_URL}/${PATH}/list/updateCards`,
    headers: header,
    data: data,
  };
  return callApi(config);
};

export const updateList = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "put",
    url: `${BASE_URL}/${PATH}/list/update`,
    headers: header,
    data: data,
  };
  return callApi(config);
};
