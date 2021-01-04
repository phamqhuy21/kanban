import * as labelConst from "../../const/label";

export const getLabelsBoardReq = (boardId) => {
  return {
    type: labelConst.GET_LABELS_BOARD_REQ,
    payload: {
      boardId,
    },
  };
};

export const getLabelsBoardSuccess = (data) => {
  return {
    type: labelConst.GET_LABELS_BOARD_SUCCESS,
    payload: {
      data,
    },
  };
};
