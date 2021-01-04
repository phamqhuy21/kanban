import { combineReducers } from "redux";
import listTasksReducer from "./listTasks";
import boardsReducer from "./boards";
import user from "./user";
import modalReducer from "./modalDetailCard";
import statusCardReducer from "./statusCard";
import usersReducer from "./users";
import detailBoardReducer from "./detailBoard";
import cardTaskReducer from "./cardTask";
import labelsReducer from "./label";

const rootReducer = combineReducers({
  listTasksReducer: listTasksReducer,
  cardTaskReducer,
  boardsReducer,
  user: user,
  labelsReducer,
  statusCard: statusCardReducer,
  usersReducer,
  detailBoardReducer,
  modal: modalReducer,
});

export default rootReducer;
