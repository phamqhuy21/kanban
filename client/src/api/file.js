import { BASE_URL, PATH } from "../const/api";
import callApi from "../utils/apiCaller";

const accessToken = localStorage.getItem("accessToken");

const header = {
  "x-access-token": accessToken,
  "Content-Type": "application/json",
};

export const uploadFile = (cardId, boardId, fileObj) => {
  let data = new FormData();
  data.append("upload", fileObj);
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/uploadFile`,
    headers: header,
    params: { cardId, boardId },
    data,
  };
  return callApi(config);
};

export const uploadImage = (cardId, boardId, fileObj) => {
  let data = new FormData();
  data.append("upload", fileObj);
  let config = {
    method: "post",
    url: `${BASE_URL}/${PATH}/uploadImage`,
    headers: header,
    params: { cardId, boardId },
    data,
  };
  return callApi(config);
};
