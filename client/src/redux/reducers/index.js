import { combineReducers } from "redux";
import boardReducer from "./board";
import userReducer from "./user";
import modalReducer from "./modalDetailCard";
import statusCardReducer from "./statusCard";

const rootReducer = combineReducers({
  board: boardReducer,
  user: userReducer,
  modal: modalReducer,
  statusCard: statusCardReducer,
});

export default rootReducer;
