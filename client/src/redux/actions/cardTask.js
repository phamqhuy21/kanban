import * as cardConst from "../../const/cardTask";

export const getDataCardReq = (boardId, cardId) => {
  return {
    type: cardConst.GET_CARD_TASK_REQ,
    payload: {
      boardId,
      cardId,
    },
  };
};

export const getDataCardSuccess = (data) => {
  return {
    type: cardConst.GET_CARD_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};
