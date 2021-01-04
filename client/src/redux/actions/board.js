import * as boardConstant from "../../const/board";

export const updateDataRequest = (data) => {
  return {
    type: boardConstant.UPDATE_DATA_REQUEST,
    payload: {
      data,
    },
  };
};

export const updateDataSuccess = (data) => {
  return {
    type: boardConstant.UPDATE_DATA_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addCardRequest = (data, listId) => {
  return {
    type: boardConstant.ADD_CARD_REQUEST,
    payload: {
      data,
      listId,
    },
  };
};

export const addCardSuccess = (data, listId) => {
  return {
    type: boardConstant.ADD_CARD_SUCCESS,
    payload: {
      data,
      listId,
    },
  };
};

export const deleteCardRequest = (listId, cardId) => {
  return {
    type: boardConstant.DELETE_CARD_REQUEST,
    payload: {
      listId,
      cardId,
    },
  };
};

export const deleteCardSuccess = (data) => {
  return {
    type: boardConstant.DELETE_CARD_SUCCESS,
    payload: {
      data,
    },
  };
};

export const editCardRequest = (listId, cardId, data) => {
  return {
    type: boardConstant.EDIT_CARD_REQUEST,
    payload: {
      listId,
      cardId,
      data,
    },
  };
};

export const editCardSuccess = (data) => {
  return {
    type: boardConstant.EDIT_CARD_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addListRequest = (status) => {
  return {
    type: boardConstant.ADD_LIST_REQUEST,
    payload: {
      status,
    },
  };
};

export const addListSuccess = (status) => {
  return {
    type: boardConstant.ADD_LIST_SUCCESS,
    payload: {
      status,
    },
  };
};

export const deleteListRequest = (index) => {
  return {
    type: boardConstant.DELETE_LIST_REQUEST,
    payload: {
      index,
    },
  };
};

export const deleteListSuccess = (board) => {
  return {
    type: boardConstant.DELETE_LIST_SUCCESS,
    payload: {
      board,
    },
  };
};

export const editListRequest = (listId, title) => {
  return {
    type: boardConstant.EDIT_LIST_REQUEST,
    payload: {
      listId,
      title,
    },
  };
};

export const editListSuccess = (data) => {
  return {
    type: boardConstant.EDIT_LIST_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addDescriptionRequest = (id, content) => {
  return {
    type: boardConstant.ADD_DESCRIPTION_REQUEST,
    payload: {
      id,
      content,
    },
  };
};

export const addDescriptionSuccess = (data) => {
  return {
    type: boardConstant.ADD_DESCRIPTION_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addCommentRequest = (id, comment) => {
  return {
    type: boardConstant.ADD_COMMENT_REQUEST,
    payload: {
      id,
      comment,
    },
  };
};

export const addCommentSuccess = (board) => {
  return {
    type: boardConstant.ADD_COMMENT_SUCCESS,
    payload: {
      board,
    },
  };
};

export const editCommentRequest = (id, oldDate, newComment) => {
  return {
    type: boardConstant.EDIT_COMMENT_REQUEST,
    payload: {
      id,
      oldDate,
      newComment,
    },
  };
};

export const editCommentSuccess = (board) => {
  return {
    type: boardConstant.EDIT_COMMENT_SUCCESS,
    payload: {
      board,
    },
  };
};

export const deleteCommentRequest = (id, comment) => {
  return {
    type: boardConstant.DELETE_COMMENT_REQUEST,
    payload: {
      id,
      comment,
    },
  };
};

export const deleteCommentSuccess = (board) => {
  return {
    type: boardConstant.DELETE_COMMENT_SUCCESS,
    payload: {
      board,
    },
  };
};

export const addMemberRequest = (id, member) => {
  return {
    type: boardConstant.ADD_MEMBER_REQUEST,
    payload: {
      id,
      member,
    },
  };
};

export const addMemberSuccess = (board) => {
  return {
    type: boardConstant.ADD_MEMBER_SUCCESS,
    payload: {
      board,
    },
  };
};

export const deleteMemberRequest = (id, member) => {
  return {
    type: boardConstant.DELETE_MEMBER_REQUEST,
    payload: {
      id,
      member,
    },
  };
};

export const deleteMemberSuccess = (board) => {
  return {
    type: boardConstant.DELETE_MEMBER_SUCCESS,
    payload: {
      board,
    },
  };
};

export const addLabelRequest = (id, label) => {
  return {
    type: boardConstant.ADD_LABEL_REQUEST,
    payload: {
      id,
      label,
    },
  };
};

export const addLabelSuccess = (board) => {
  return {
    type: boardConstant.ADD_LABEL_SUCCESS,
    payload: {
      board,
    },
  };
};

export const deleteLabelRequest = (id, label) => {
  return {
    type: boardConstant.DELETE_LABEL_REQUEST,
    payload: {
      id,
      label,
    },
  };
};

export const deleteLabelSuccess = (board) => {
  return {
    type: boardConstant.DELETE_LABEL_SUCCESS,
    payload: {
      board,
    },
  };
};

export const addExDateRequest = (id, exDate) => {
  return {
    type: boardConstant.ADD_EXDATE_REQUEST,
    payload: {
      id,
      exDate,
    },
  };
};

export const addExDateSuccess = (board) => {
  return {
    type: boardConstant.ADD_EXDATE_SUCCESS,
    payload: {
      board,
    },
  };
};

export const deleteExDateRequest = (id) => {
  return {
    type: boardConstant.DELETE_EXDATE_REQUEST,
    payload: {
      id,
    },
  };
};

export const deleteExDateSuccess = (board) => {
  return {
    type: boardConstant.DELETE_EXDATE_SUCCESS,
    payload: {
      board,
    },
  };
};

export const endExDateRequest = (id, exDate) => {
  return {
    type: boardConstant.END_EXDATE_REQUEST,
    payload: {
      id,
      exDate,
    },
  };
};

export const endExDateSuccess = (board) => {
  return {
    type: boardConstant.END_EXDATE_SUCCESS,
    payload: {
      board,
    },
  };
};

export const addFileRequest = (id, url) => {
  return {
    type: boardConstant.ADD_FILE_REQUEST,
    payload: {
      id,
      url,
    },
  };
};

export const addFileSuccess = (board) => {
  return {
    type: boardConstant.ADD_FILE_SUCCESS,
    payload: {
      board,
    },
  };
};

export const addGroundRequest = (id, url) => {
  return {
    type: boardConstant.ADD_GROUND_REQUEST,
    payload: {
      id,
      url,
    },
  };
};

export const addGroundSuccess = (board) => {
  return {
    type: boardConstant.ADD_GROUND_SUCCESS,
    payload: {
      board,
    },
  };
};

export const deleteGroundRequest = (id) => {
  return {
    type: boardConstant.ADD_GROUND_REQUEST,
    payload: {
      id,
    },
  };
};

export const deleteGroundSuccess = (board) => {
  return {
    type: boardConstant.ADD_GROUND_SUCCESS,
    payload: {
      board,
    },
  };
};

export const moveCardRequest = (indexList, indeCard, content, idList) => {
  return {
    type: boardConstant.MOVE_CARD_REQUEST,
    payload: {
      indexList,
      indeCard,
      content,
      idList,
    },
  };
};

export const moveCardSuccess = (board) => {
  return {
    type: boardConstant.MOVE_CARD_SUCCESS,
    payload: {
      board,
    },
  };
};

export const cloneCardRequest = (content, idList) => {
  return {
    type: boardConstant.CLONE_CARD_REQUEST,
    payload: {
      content,
      idList,
    },
  };
};

export const cloneCardSuccess = (content, idList) => {
  return {
    type: boardConstant.CLONE_CARD_SUCCESS,
    payload: {
      content,
      idList,
    },
  };
};

export const saveCardRequest = (indexList, indexCard, task) => {
  return {
    type: boardConstant.SAVE_CARD_REQUEST,
    payload: {
      indexList,
      indexCard,
      task,
    },
  };
};

export const saveCardSuccess = (board) => {
  return {
    type: boardConstant.SAVE_CARD_SUCCESS,
    payload: {
      board,
    },
  };
};

export const unSaveCardRequest = (indexList, indexCard, task) => {
  return {
    type: boardConstant.UNSAVE_CARD_REQUEST,
    payload: {
      indexList,
      indexCard,
      task,
    },
  };
};

export const unSaveCardSuccess = (board) => {
  return {
    type: boardConstant.UNSAVE_CARD_SUCCESS,
    payload: {
      board,
    },
  };
};

export const addActionCardSuccess = (actions, idCard) => {
  return {
    type: boardConstant.COLLECT_ACTION_CARD_SUCCESS,
    payload: {
      actions,
      idCard,
    },
  };
};
