import * as modalConstant from "../../const/modalDetailCard";

var initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case modalConstant.OPEN_MODAL: {
      state = true;
      return state;
    }
    case modalConstant.CLOSE_MODAL: {
      state = false;
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
