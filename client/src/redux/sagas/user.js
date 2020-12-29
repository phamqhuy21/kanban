import { call, put, takeEvery } from "redux-saga/effects";
import { getUser } from "../../api/user";
import * as userConst from "../../const/user";
import { getUserSuccess } from "../actions/user";

function* getUserSagas({ payload }) {
  let result = yield call(getUser);
  if (result.status === 200) {
    let data = result.data;
    yield put(getUserSuccess(data.user));
  }
}

export function* watchActionUser() {
  yield takeEvery(userConst.GET_USER_REQ, getUserSagas);
}
