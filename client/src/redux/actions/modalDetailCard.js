import * as modalConstant from "../../const/modalDetailCard";

export const openModal = () => {
  return {
    type: modalConstant.OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: modalConstant.CLOSE_MODAL,
  };
};
