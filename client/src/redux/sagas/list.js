import { takeEvery, put, select } from "redux-saga/effects";
import {
  addListSuccess,
  deleteListSuccess,
  editListSuccess,
} from "../actions/board";
import * as typeBoard from "../../const/board";
import { cloneDeep } from "lodash";

function* addListSagas({ payload }) {
  const { status } = payload;
  yield put(addListSuccess(status));
}

function* deleteListSagas({ payload }) {
  const { index } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  newState.splice(index, 1);
  yield put(deleteListSuccess(newState));
}

function* editListSagas({ payload }) {
  const { listId, title } = payload;
  const listTasksReducer = yield select((state) => state.listTasksReducer);
  let newState = cloneDeep(listTasksReducer);
  newState = newState.map((list) => {
    if (list._id === listId) {
      return { ...list, title };
    } else return { ...list };
  });
  yield put(editListSuccess(newState));
}

export function* watchActionList() {
  yield takeEvery(typeBoard.ADD_LIST_REQUEST, addListSagas);
  yield takeEvery(typeBoard.DELETE_LIST_REQUEST, deleteListSagas);
  yield takeEvery(typeBoard.EDIT_LIST_REQUEST, editListSagas);
}
