import { call, put, takeEvery } from "redux-saga/effects";
import { getBoards, getDetailBoard } from "../../api/boards";
import * as typeBoards from "../../const/boards";
import { getBoardDetailSuccess, getBoardsSuccess } from "../actions/boards";

function* getBoardsSagas({ payload }) {
  let result = yield call(getBoards);
  if (result.status === 200) {
    let data = result.data.data;
    yield put(getBoardsSuccess(data));
  }
}

function* getBoardDetailSagas({ payload }) {
  const { boardId } = payload;
  let result = yield call(getDetailBoard, boardId);
  if (result.status === 200) {
    let data = result.data.data;
    yield put(getBoardDetailSuccess(data));
  }
}

export function* watchActionBoards() {
  yield takeEvery(typeBoards.GET_BOARDS_REQ, getBoardsSagas);
  yield takeEvery(typeBoards.GET_DETAIL_BOARD_REQ, getBoardDetailSagas);
}
