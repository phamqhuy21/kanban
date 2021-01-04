import { cloneDeep } from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { getBoards, getDetailBoard } from "../../api/boards";
import * as typeBoards from "../../const/boards";
import { updateDataSuccess } from "../actions/board";
import {
  getBoardDetailSuccess,
  getBoardsSuccess,
  updateBoardSuccess,
} from "../actions/boards";

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
    if (data.lists) {
      yield put(updateDataSuccess(data.lists));
    }
  }
}

function* updateBoardSagas({ payload }) {
  const { data } = payload;
  const detailBoardReducer = yield select((state) => state.detailBoardReducer);
  let detailBoard = cloneDeep(detailBoardReducer);
  detailBoard.lists = data;
  //   yield put(updateBoardSuccess(detailBoard));
  yield put(updateDataSuccess(data));
}

export function* watchActionBoards() {
  yield takeEvery(typeBoards.GET_BOARDS_REQ, getBoardsSagas);
  yield takeEvery(typeBoards.GET_DETAIL_BOARD_REQ, getBoardDetailSagas);
  yield takeEvery(typeBoards.UPDATE_BOARD_REQUEST, updateBoardSagas);
}
