import { call, put, takeEvery } from "redux-saga/effects";
import { getUser } from "../../api/user";
import * as userConst from "../../const/user";
import { getUserSuccess, getUserFailed } from "../actions/user";

function* getUserSagas({ payload }) {
  try {
    let result = yield call(getUser);
    if (result.status === 200) {
      let data = result.data;
      yield put(getUserSuccess(data.user));
    }
  } catch (err) {
    if (err.response) {
      let error = {
        status: err.response.status,
        message: err.response.data.message,
      };
      yield put(getUserFailed(error));
    }
    console.log(err.response);
  }
}

export function* watchActionUser() {
  yield takeEvery(userConst.GET_USER_REQ, getUserSagas);
}
