import { cloneDeep } from "lodash";
import * as userConstant from "../../const/user";

var initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_USER_SUCCESS: {
      let newState = cloneDeep(action.payload.data);
      return newState;
    }
    case userConstant.GET_USER_FAILED: {
      let newState = cloneDeep(action.payload.error);
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
