import { takeEvery, put, select } from "redux-saga/effects";
import {
  addCommentSuccess,
  addLabelSuccess,
  deleteLabelSuccess,
  moveCardSuccess,
  cloneCardSuccess,
  addExDateSuccess,
  endExDateSuccess,
  addActionCardSuccess,
  addMemberSuccess,
  deleteMemberSuccess,
  addGroundSuccess,
  addFileSuccess,
  deleteGroundSuccess,
  saveCardSuccess,
  unSaveCardSuccess,
  editCommentSuccess,
  deleteCommentSuccess,
  addDescriptionSuccess,
  deleteExDateSuccess,
} from "../actions/board";
import * as typeBoard from "../../const/board";
import { cloneDeep, findIndex } from "lodash";

function* addDescriptionSagas({ payload }) {
  const { id, content } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.description = content;
      }
    });
  });
  yield put(addDescriptionSuccess(newState));
  yield put(addActionCardSuccess("thêm mô tả", id));
}

function* addCommentSagas({ payload }) {
  const { id, comment } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.comment.push(comment);
      }
    });
  });
  yield put(addCommentSuccess(newState));
  yield put(addActionCardSuccess("thêm bình luận", id));
}

function* editCommentSagas({ payload }) {
  const { id, oldDate, newComment } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        let index = findIndex(e.comment, function (o) {
          return o.time === oldDate;
        });
        e.comment[index] = newComment;
      }
    });
  });
  yield put(editCommentSuccess(newState));
  yield put(addActionCardSuccess("cập nhật bình luận", id));
}

function* deleteCommentSagas({ payload }) {
  const { id, comment } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        let index = findIndex(e.comment, function (o) {
          return o.time === comment.time;
        });
        e.comment.splice(index, 1);
      }
    });
  });
  yield put(deleteCommentSuccess(newState));
  yield put(addActionCardSuccess("xóa bình luận", id));
}

function* addMemberSagas({ payload }) {
  const { id, member } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.member.push(member);
      }
    });
  });
  yield put(addMemberSuccess(newState));
}

function* deleteMemberSagas({ payload }) {
  const { id, member } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        let index = e.member.findIndex((mem) => mem.name === member.name);
        e.member.splice(index, 1);
      }
    });
  });
  yield put(deleteMemberSuccess(newState));
}

function* addLabelSagas({ payload }) {
  const { id, label } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.label.push(label);
      }
    });
  });
  yield put(addLabelSuccess(newState));
  yield put(addActionCardSuccess("thêm nhãn dán", id));
}

function* deleteLabelSagas({ payload }) {
  const { id, label } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        let index = e.label.indexOf(label);
        e.label.splice(index, 1);
      }
    });
  });
  yield put(deleteLabelSuccess(newState));
  yield put(addActionCardSuccess("xóa nhãn dán", id));
}

function* addExDateSagas({ payload }) {
  const { id, exDate } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.exDate = exDate;
      }
    });
  });
  yield put(addExDateSuccess(newState));
  yield put(addActionCardSuccess("thêm ngày hết hạn", id));
}

function* deleteExDateSagas({ payload }) {
  const { id } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.exDate = "";
      }
    });
  });
  yield put(deleteExDateSuccess(newState));
  yield put(addActionCardSuccess("xóa ngày hết hạn", id));
}

function* endExDateSagas({ payload }) {
  const { id, exDate } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.exDate = exDate;
      }
    });
  });
  yield put(endExDateSuccess(newState));
  if (exDate.successed === true) {
    yield put(addActionCardSuccess("đánh dấu ngày hết hạn hoàn thành", id));
  } else {
    yield put(
      addActionCardSuccess("đánh dấu ngày hết hạn chưa hoàn thành", id)
    );
  }
}

function* addFileSagas({ payload }) {
  const { id, url } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.file.push(url);
      }
    });
  });
  yield put(addFileSuccess(newState));
  yield put(addActionCardSuccess("thêm tập tin đính kèm", id));
}

function* addGroundSagas({ payload }) {
  const { id, url } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.groundImage = url;
      }
    });
  });
  yield put(addGroundSuccess(newState));
  yield put(addActionCardSuccess("thay đổi hình nền", id));
}

function* deleteGroundSagas({ payload }) {
  const { id } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  yield newState.forEach((element) => {
    element.task.forEach((e) => {
      if (e.id === id) {
        e.groundImage = "";
      }
    });
  });
  yield put(deleteGroundSuccess(newState));
  yield put(addActionCardSuccess("xóa hình nền", id));
}

function* moveCardSagas({ payload }) {
  const { indexList, indexCard, content, idList } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  newState[indexList].task.splice(indexCard, 1);
  const newBoard = newState.map((list) => {
    if (list.id === idList) {
      return {
        ...list,
        task: [...list.task, content],
      };
    } else {
      return list;
    }
  });
  yield put(moveCardSuccess(newBoard));
  yield put(addActionCardSuccess("di chuyển thẻ", content.id));
}

function* cloneCardSagas({ payload }) {
  const { content, idList } = payload;
  yield put(cloneCardSuccess(content, idList));
  yield put(addActionCardSuccess("sao chép thẻ", content.id));
}

function* saveCardSagas({ payload }) {
  const { indexList, indexCard, task } = payload;
  const board = yield select((state) => state.board);
  var newState = cloneDeep(board);
  newState[indexList].task.splice(indexCard, 1, task);
  yield put(saveCardSuccess(newState));
}

function* unSaveCardSagas({ payload }) {
  const { indexList, indexCard, task } = payload;
  const board = yield select((state) => state.board);
  var newState = cloneDeep(board);
  newState[indexList].task.splice(indexCard, 1, task);
  yield put(unSaveCardSuccess(newState));
}

export function* watchActionDetailCard() {
  yield takeEvery(typeBoard.ADD_DESCRIPTION_REQUEST, addDescriptionSagas);
  yield takeEvery(typeBoard.ADD_COMMENT_REQUEST, addCommentSagas);
  yield takeEvery(typeBoard.EDIT_COMMENT_REQUEST, editCommentSagas);
  yield takeEvery(typeBoard.DELETE_COMMENT_REQUEST, deleteCommentSagas);
  yield takeEvery(typeBoard.ADD_MEMBER_REQUEST, addMemberSagas);
  yield takeEvery(typeBoard.DELETE_MEMBER_REQUEST, deleteMemberSagas);
  yield takeEvery(typeBoard.ADD_LABEL_REQUEST, addLabelSagas);
  yield takeEvery(typeBoard.ADD_EXDATE_REQUEST, addExDateSagas);
  yield takeEvery(typeBoard.DELETE_EXDATE_REQUEST, deleteExDateSagas);
  yield takeEvery(typeBoard.END_EXDATE_REQUEST, endExDateSagas);
  yield takeEvery(typeBoard.ADD_FILE_REQUEST, addFileSagas);
  yield takeEvery(typeBoard.ADD_GROUND_REQUEST, addGroundSagas);
  yield takeEvery(typeBoard.DELETE_GROUND_REQUEST, deleteGroundSagas);
  yield takeEvery(typeBoard.DELETE_LABEL_REQUEST, deleteLabelSagas);
  yield takeEvery(typeBoard.MOVE_CARD_REQUEST, moveCardSagas);
  yield takeEvery(typeBoard.CLONE_CARD_REQUEST, cloneCardSagas);
  yield takeEvery(typeBoard.SAVE_CARD_REQUEST, saveCardSagas);
  yield takeEvery(typeBoard.UNSAVE_CARD_REQUEST, unSaveCardSagas);
}
