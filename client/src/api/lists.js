import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

const accessToken = localStorage.getItem("accessToken");

const header = {
  "x-access-token": accessToken,
  "Content-Type": "application/json",
};

export const createList = (boardId, data) => {
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
