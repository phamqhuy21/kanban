import { takeEvery, put, select } from "redux-saga/effects";
import {
  updateDataSuccess,
  addCartSuccess,
  deleteCartSuccess,
  editCartSuccess,
} from "../actions/board";
import * as typeBoard from "../../const/board";
import { cloneDeep } from "lodash";

function* getUpdateDataSagas({ payload }) {
  const { data } = payload;
  yield put(updateDataSuccess(data));
}

function* addCardSagas({ payload }) {
  const { content, id } = payload;
  yield put(addCartSuccess(content, id));
}

function* deleteCardSagas({ payload }) {
  const { indexList, indexCard } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  newState[indexList].task.splice(indexCard, 1);
  yield put(deleteCartSuccess(newState));
}

function* editCardSagas({ payload }) {
  const { indexList, indexCard, task } = payload;
  const board = yield select((state) => state.board);
  const newState = cloneDeep(board);
  newState[indexList].task.splice(indexCard, 1, task);
  yield put(editCartSuccess(newState));
}

export function* watchActionCard() {
  yield takeEvery(typeBoard.UPDATE_DATA_REQUEST, getUpdateDataSagas);
  yield takeEvery(typeBoard.ADD_CARD_REQUEST, addCardSagas);
  yield takeEvery(typeBoard.DELETE_CARD_REQUEST, deleteCardSagas);
  yield takeEvery(typeBoard.EDIT_CARD_REQUEST, editCardSagas);
}
