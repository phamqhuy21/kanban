import { all } from "redux-saga/effects";
import { watchActionDetailCard } from "./detailCard";
import { watchActionList } from "./list";
import { watchActionCard } from "./card";
import { watchActionStatusCard } from "./statusCard";

export default function* rootSaga() {
  yield all([
    watchActionDetailCard(),
    watchActionList(),
    watchActionCard(),
    watchActionStatusCard(),
  ]);
}
