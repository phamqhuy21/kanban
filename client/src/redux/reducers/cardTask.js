import { cloneDeep } from "lodash";
import * as cardConst from "../../const/cardTask";

var initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case cardConst.GET_CARD_TASK_SUCCESS: {
      let newState = cloneDeep(action.payload.data);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
