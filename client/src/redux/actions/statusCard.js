import * as statusCardConstant from "../../const/statusCard";

export const addWinStatusRequest = (data) => {
  return {
    type: statusCardConstant.ADD_WIN_STATUS_REQUEST,
    payload: {
      data,
    },
  };
};

export const addWinStatusSuccess = (data) => {
  return {
    type: statusCardConstant.ADD_WIN_STATUS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addLoseStatusRequest = (data) => {
  return {
    type: statusCardConstant.ADD_LOSE_STATUS_REQUEST,
    payload: {
      data,
    },
  };
};

export const addLoseStatusSuccess = (data) => {
  return {
    type: statusCardConstant.ADD_LOSE_STATUS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addDeleteStatusRequest = (data) => {
  return {
    type: statusCardConstant.ADD_DELETE_STATUS_REQUEST,
    payload: {
      data,
    },
  };
};

export const addDeleteStatusSuccess = (data) => {
  return {
    type: statusCardConstant.ADD_DELETE_STATUS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addMoveStatusRequest = (data) => {
  return {
    type: statusCardConstant.ADD_MOVETO_STATUS_REQUEST,
    payload: {
      data,
    },
  };
};

export const addMoveStatusSuccess = (data) => {
  return {
    type: statusCardConstant.ADD_MOVETO_STATUS_SUCCESS,
    payload: {
      data,
    },
  };
};
