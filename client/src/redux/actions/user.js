import * as userConstant from "../../const/user";

export const fetchDataUser = () => {
  return {
    type: userConstant.FETCH_DATA_USER,
  };
};
