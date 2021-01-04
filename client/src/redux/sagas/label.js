import { call, put, takeEvery } from "redux-saga/effects";
import { getLabelsBoard } from "../../api/label";
import * as labelConst from "../../const/label";
import { getLabelsBoardSuccess } from "../actions/label";

function* getLabelsBoardSagas({ payload }) {
  const { boardId } = payload;
  let response = yield call(getLabelsBoard, boardId);
  if (response.status === 200) {
    let data = response.data.data;
    yield put(getLabelsBoardSuccess(data));
  }
}

export function* watchActionLabel() {
  yield takeEvery(labelConst.GET_LABELS_BOARD_REQ, getLabelsBoardSagas);
}
