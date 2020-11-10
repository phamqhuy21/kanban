import * as userConstant from "../../const/user";

var initialState = [
  {
    alias: "PH",
    name: "phạm quốc huy",
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.FETCH_DATA_USER: {
      return [...state];
    }
    default:
      return state;
  }
};

export default reducer;
