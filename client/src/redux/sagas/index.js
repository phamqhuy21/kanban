import { all } from "redux-saga/effects";
import { watchActionDetailCard } from "./detailCard";
import { watchActionList } from "./list";
import { watchActionCard } from "./cardTask";
import { watchActionStatusCard } from "./statusCard";
import { watchActionBoards } from "./boards";
import { watchActionUser } from "./user";
import { watchActionLabel } from "./label";

export default function* rootSaga() {
  yield all([
    watchActionDetailCard(),
    watchActionList(),
    watchActionCard(),
    watchActionStatusCard(),
    watchActionBoards(),
    watchActionUser(),
    watchActionLabel(),
  ]);
}
