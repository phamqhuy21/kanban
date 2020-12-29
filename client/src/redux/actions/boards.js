import * as boardsConst from "../../const/boards";

export const getBoardsReq = () => {
  return {
    type: boardsConst.GET_BOARDS_REQ,
  };
};

export const getBoardsSuccess = (data) => {
  return {
    type: boardsConst.GET_BOARDS_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getBoardDetailReq = (boardId) => {
  return {
    type: boardsConst.GET_DETAIL_BOARD_REQ,
    payload: {
      boardId,
    },
  };
};

export const getBoardDetailSuccess = (data) => {
  return {
    type: boardsConst.GET_DETAIL_BOARD_SUCCESS,
    payload: {
      data,
    },
  };
};
