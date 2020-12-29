import { all } from "redux-saga/effects";
import { watchActionDetailCard } from "./detailCard";
import { watchActionList } from "./list";
import { watchActionCard } from "./card";
import { watchActionStatusCard } from "./statusCard";
import { watchActionBoards } from "./boards";
import { watchActionUser } from "./user";

export default function* rootSaga() {
  yield all([
    watchActionDetailCard(),
    watchActionList(),
    watchActionCard(),
    watchActionStatusCard(),
    watchActionBoards(),
    watchActionUser(),
  ]);
}
