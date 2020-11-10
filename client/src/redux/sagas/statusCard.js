import { takeEvery, put, select } from "redux-saga/effects";
import { addDeleteStatusSuccess, addLoseStatusSuccess, addMoveStatusSuccess, addWinStatusSuccess } from "../actions/statusCard";
import * as typeStatus from "../../const/statusCard";
import { cloneDeep } from "lodash";

const handleStatusData = (data,statusCardData,status) => {
  let newState = cloneDeep(statusCardData);
  newState[`${status}`].push(data);
  return newState;
}

function* getAddWinStatusCardSagas({ payload }) {
  const { data } = payload;
  const statusCard = yield select((state) => state.statusCard);
  let newState = handleStatusData(data,statusCard,'win');
  yield put(addWinStatusSuccess(newState));
}

function* getAddLoseStatusCardSagas({ payload }) {
  const { data } = payload;
  const statusCard = yield select((state) => state.statusCard);
  let newState = handleStatusData(data,statusCard,'lose');
  yield put(addLoseStatusSuccess(newState));
}

function* getAddDeleteStatusCardSagas({ payload }) {
  const { data } = payload;
  const statusCard = yield select((state) => state.statusCard);
  let newState = handleStatusData(data,statusCard,'delete');
  yield put(addDeleteStatusSuccess(newState));
}

function* getAddMoveStatusCardSagas({ payload }) {
  const { data } = payload;
  const statusCard = yield select((state) => state.statusCard);
  let newState = handleStatusData(data,statusCard,'moveto');
  yield put(addMoveStatusSuccess(newState));
}

export function* watchActionStatusCard() {
  yield takeEvery(typeStatus.ADD_WIN_STATUS_REQUEST, getAddWinStatusCardSagas);
  yield takeEvery(typeStatus.ADD_LOSE_STATUS_REQUEST, getAddLoseStatusCardSagas);
  yield takeEvery(typeStatus.ADD_DELETE_STATUS_REQUEST, getAddDeleteStatusCardSagas);
  yield takeEvery(typeStatus.ADD_MOVETO_STATUS_REQUEST, getAddMoveStatusCardSagas);
}
