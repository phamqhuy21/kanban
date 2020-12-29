import { combineReducers } from "redux";
import boardReducer from "./board";
import boardsReducer from "./boards";
import user from "./user";
import modalReducer from "./modalDetailCard";
import statusCardReducer from "./statusCard";
import usersReducer from "./users";
import detailBoardReducer from "./detailBoard";

const rootReducer = combineReducers({
  board: boardReducer,
  boardsReducer,
  user: user,
  modal: modalReducer,
  statusCard: statusCardReducer,
  usersReducer,
  detailBoardReducer,
});

export default rootReducer;
