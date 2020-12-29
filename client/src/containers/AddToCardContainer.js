import React from "react";
import PropTypes from "prop-types";
import AddToCard from "../components/Board/AddToCard/AddToCard";
import { findIndex } from "lodash";
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
import { useDispatch } from "react-redux";

AddToCardContainer.propTypes = {
  card: PropTypes.object,
};

function AddToCardContainer(props) {
  const { card } = props;
  const dispatch = useDispatch();

  const handleAddMember = (mem, card) => {
    console.log(card);
    if (
      findIndex(card.members, function (member) {
        return member.alias === mem.alias;
      }) !== -1
    ) {
      dispatch(deleteMemberRequest(card.id, mem));
    } else {
      dispatch(addMemberRequest(card.id, mem));
    }
  };

  const selectLabel = (color, card) => {
    if (card.label.includes(color) === false) {
      dispatch(addLabelRequest(card.id, color));
    } else {
      dispatch(deleteLabelRequest(card.id, color));
    }
  };

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
      dispatch(addFileRequest(card.id, url));
    });
  };

  const handlePreviewImg = (info, card) => {
    getBase64(info.originFileObj, (imageUrl) => {
      dispatch(addGroundRequest(card.id, imageUrl));
    });
  };

  const handleDeleteGround = (card) => {
    dispatch(deleteGroundRequest(card.id));
  };

  return (
    <AddToCard
      card={card}
      handleAddMember={handleAddMember}
      selectLabel={selectLabel}
      handleSaveExDate={handleSaveExDate}
      handleDeleteExDate={handleDeleteExDate}
      handlePreviewFile={handlePreviewFile}
      handlePreviewImg={handlePreviewImg}
      handleDeleteGround={handleDeleteGround}
    />
  );
}

export default AddToCardContainer;
