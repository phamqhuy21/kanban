import React from "react";
import PropTypes from "prop-types";
import DeadlineForm from "../../components/Board/AddToCard/DeadlineForm";
import { useRouteMatch } from "react-router-dom";
import { updateCardTask } from "../../api/cardTask";
import { useDispatch } from "react-redux";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { getLabelsBoardReq } from "../../redux/actions/label";
import { message } from "antd";
import moment from "moment";

DeadlineFormContainer.propTypes = {};

function DeadlineFormContainer(props) {
  const { card, handleDeleteExDate } = props;
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleSaveDeadline = (card, time, date, timer) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let deadline = date + "T" + time + "+07:00";
    let dataReq = {
      boardId,
      cardId,
      data: {
        deadline,
        timer,
      },
    };
    updateCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          dispatch(getLabelsBoardReq(boardId));
          message.success(
            `Thêm thời gian hết hạn cho thẻ ${card.title} thành công`
          );
        } else {
          message.error(
            `Thêm thời gian hết hạn cho thẻ ${card.title} thất bại`
          );
        }
      })
      .catch((err) => {
        message.error(`Thêm thời gian hết hạn cho thẻ ${card.title} thất bại`);
      });
  };

  return (
    <DeadlineForm
      card={card}
      handleSaveDeadline={handleSaveDeadline}
      handleDeleteExDate={handleDeleteExDate}
    />
  );
}

export default DeadlineFormContainer;
