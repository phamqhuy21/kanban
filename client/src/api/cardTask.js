import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

// const accessToken = localStorage.getItem("accessToken");

// const header = {
//   "x-access-token": accessToken,
//   "Content-Type": "application/json",
// };

export const createCardTask = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/card`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const updateCardTask = (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "put",
    url: `${BASE_URL}/${PATH}/card/update`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const deleteCardTask = (cardId, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "delete",
    url: `${BASE_URL}/${PATH}/card/${cardId}`,
    headers: header,
    data,
  };
  return callApi(config);
};

export const getDetailCardTask = (cardId, boardId) => {
  const accessToken = localStorage.getItem("accessToken");
  const header = {
    "x-access-token": accessToken,
    "Content-Type": "application/json",
  };
  let config = {
    method: "get",
    url: `${BASE_URL}/${PATH}/card`,
    params: {
      cardId,
      boardId,
    },
    headers: header,
  };
  return callApi(config);
};
