import React from "react";
import PropTypes from "prop-types";
import CloneCardForm from "../../components/Board/Manupulation/CloneCardForm";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { createCardTask } from "../../api/cardTask";
import { message } from "antd";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { createAction } from "../../api/action";

CloneCardContainer.propTypes = {};

function CloneCardContainer(props) {
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const listTasksReducer = useSelector((state) => state.listTasksReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleCloneCard = (listId, position, newCard, oldList) => {
    let boardId = match.params.id;
    let cardId = cardTaskReducer._id;
    let dataReq = {
      boardId,
      listId,
      position,
      data: newCard,
    };
    createCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success(`Sao chép thẻ ${cardTaskReducer.title} thành công`);
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          createAction({
            boardId,
            data: {
              action: `sao chép thẻ ${cardTaskReducer.title} từ danh sách ${oldList.title}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else message.error(`Sao chép thẻ ${cardTaskReducer.title} thất bại`);
      })
      .catch((err) => {
        message.error(`Sao chép thẻ ${cardTaskReducer.title} thất bại`);
      });
  };

  return (
    <CloneCardForm
      card={cardTaskReducer}
      lists={listTasksReducer}
      handleCloneCard={handleCloneCard}
    />
  );
}

export default CloneCardContainer;
