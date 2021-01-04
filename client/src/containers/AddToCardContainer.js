import React from "react";
import PropTypes from "prop-types";
import AddToCard from "../components/Board/AddToCard/AddToCard";
import { cloneDeep, findIndex } from "lodash";
import {
  addExDateRequest,
  addFileRequest,
  addGroundRequest,
  addLabelRequest,
  addMemberRequest,
  deleteExDateRequest,
  deleteGroundRequest,
  deleteLabelRequest,
  deleteMemberRequest,
} from "../redux/actions/board";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { updateCardTask } from "../api/cardTask";
import { message } from "antd";
import { getDataCardReq } from "../redux/actions/cardTask";

AddToCardContainer.propTypes = {};

function AddToCardContainer(props) {
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleSaveExDate = (card, time, date, timer) => {
    dispatch(
      addExDateRequest(card.id, { date: time + date, timer, successed: false })
    );
  };

  const handleDeleteExDate = (card) => {
    dispatch(deleteExDateRequest(card.id));
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handlePreviewFile = (info) => {
    getBase64(info.originFileObj, (url) => {
      dispatch(addFileRequest(cardTaskReducer._id, url));
    });
  };

  const handlePreviewImg = (info, card) => {
    getBase64(info.originFileObj, (imageUrl) => {
      console.log(imageUrl);
      //   dispatch(addGroundRequest(card.id, imageUrl));
    });
  };

  const handleDeleteGround = (card) => {
    dispatch(deleteGroundRequest(card.id));
  };

  return (
    <AddToCard
      card={cardTaskReducer}
      handleSaveExDate={handleSaveExDate}
      handleDeleteExDate={handleDeleteExDate}
      handlePreviewFile={handlePreviewFile}
      handlePreviewImg={handlePreviewImg}
      handleDeleteGround={handleDeleteGround}
    />
  );
}

export default AddToCardContainer;
