import { cloneDeep } from "lodash";
import * as boardsConst from "../../const/boards";

var initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardsConst.GET_BOARDS_SUCCESS: {
      let newState = cloneDeep(action.payload.data);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
