import { cloneDeep } from "lodash";
import * as labelConst from "../../const/label";

var initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case labelConst.GET_LABELS_BOARD_SUCCESS: {
      const { data } = action.payload;
      let newState = cloneDeep(data);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
