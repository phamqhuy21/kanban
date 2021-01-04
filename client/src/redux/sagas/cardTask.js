import { takeEvery, put, select, call } from "redux-saga/effects";
import {
  updateDataSuccess,
  addCardSuccess,
  deleteCardSuccess,
  editCardSuccess,
} from "../actions/board";
import * as typeBoard from "../../const/board";
import * as cardConst from "../../const/cardTask";
import { cloneDeep, findIndex } from "lodash";
import { getDataCardSuccess } from "../actions/cardTask";
import { getDetailCardTask } from "../../api/cardTask";

function* getUpdateDataSagas({ payload }) {
  const { data } = payload;
  yield put(updateDataSuccess(data));
}

function* addCardSagas({ payload }) {
  const { data, listId } = payload;
  yield put(addCardSuccess(data, listId));
}

function* deleteCardSagas({ payload }) {
  const { listId, cardId } = payload;
  const listTasksReducer = yield select((state) => state.listTasksReducer);
  let newState = cloneDeep(listTasksReducer);
  let filterList = newState.filter((list) => list._id === listId)[0];
  let indexCard = findIndex(filterList.cards, (e) => {
    return e._id === cardId;
  });
  filterList.cards.splice(indexCard, 1);
  yield put(deleteCardSuccess(newState));
}

function* editCardSagas({ payload }) {
  const { listId, cardId, data } = payload;
  const listTasksReducer = yield select((state) => state.listTasksReducer);
  let newState = cloneDeep(listTasksReducer);
  newState = newState.map((list) => {
    if (list._id === listId) {
      let cards = list.cards.map((card) => {
        if (card._id === cardId) {
          return { ...card, title: data.title };
        } else return card;
      });
      return { ...list, cards };
    } else return list;
  });
  yield put(editCardSuccess(newState));
}

function* getDetailCardTasksagas({ payload }) {
  const { cardId, boardId } = payload;
  let response = yield call(getDetailCardTask, cardId, boardId);
  if (response.status === 200) {
    let dataRes = response.data.data;
    yield put(getDataCardSuccess(dataRes));
  }
  //   if (response.st)
  //   if (dataCard) yield put(getDataCardSuccess(dataCard));
}

export function* watchActionCard() {
  yield takeEvery(typeBoard.UPDATE_DATA_REQUEST, getUpdateDataSagas);
  yield takeEvery(typeBoard.ADD_CARD_REQUEST, addCardSagas);
  yield takeEvery(typeBoard.DELETE_CARD_REQUEST, deleteCardSagas);
  yield takeEvery(typeBoard.EDIT_CARD_REQUEST, editCardSagas);
  yield takeEvery(cardConst.GET_CARD_TASK_REQ, getDetailCardTasksagas);
}
