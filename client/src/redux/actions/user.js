import * as userConstant from "../../const/user";

export const fetchDataUser = () => {
  return {
    type: userConstant.FETCH_DATA_USER,
  };
};

export const signInUser = (data) => {
  return {
    type: userConstant.SIGN_IN_SUCCESS,
    payload: { data },
  };
};

export const getUserReq = () => {
  return {
    type: userConstant.GET_USER_REQ,
  };
};

export const getUserSuccess = (data) => {
  return {
    type: userConstant.GET_USER_SUCCESS,
    payload: { data },
  };
};
