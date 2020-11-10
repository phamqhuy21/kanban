import * as statusCardConstant from "../../const/statusCard";

var initialState = {
  win: [],
  lose: [],
  delete: [],
  moveto: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case statusCardConstant.ADD_WIN_STATUS_SUCCESS: {
      const { data } = action.payload;
      return data;
    }
    case statusCardConstant.ADD_LOSE_STATUS_SUCCESS: {
      const { data } = action.payload;
      return data;
    }
    case statusCardConstant.ADD_DELETE_STATUS_SUCCESS: {
      const { data } = action.payload;
      return data;
    }
    case statusCardConstant.ADD_MOVETO_STATUS_SUCCESS: {
      const { data } = action.payload;
      return data;
    }
    default:
      return state;
  }
};

export default reducer;
