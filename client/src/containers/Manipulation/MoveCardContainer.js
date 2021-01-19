import React from "react";
import PropTypes from "prop-types";
import MoveCardForm from "../../components/Board/Manupulation/MoveCardForm";
import { useDispatch, useSelector } from "react-redux";
import { findIndex } from "lodash";
import { useRouteMatch } from "react-router-dom";
import { updatePositionCards } from "../../api/lists";
import { message } from "antd";
import { createAction } from "../../api/action";
import { getBoardDetailReq } from "../../redux/actions/boards";

MoveCardContainer.propTypes = {};

function MoveCardContainer(props) {
  const listTasksReducer = useSelector((state) => state.listTasksReducer);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleMoveCard = (value, lists, card) => {
    let listSource = lists.filter((list) => {
      return (
        findIndex(list.cards, (cardFilter) => {
          return cardFilter._id === card._id;
        }) !== -1
      );
    })[0];
    let listDestination = lists.filter((list) => {
      return list._id === value.list;
    })[0];
    let indexSource = findIndex(listSource.cards, (cardFilter) => {
      return cardFilter._id === card._id;
    });
    let indexDestination = value.position - 1;
    let listSourceId = listSource._id;
    let listDestinationId = value.list;
    let boardId = match.params.id;
    let listCardsSource = listSource?.cards;
    let listCardsDestination = listDestination?.cards;

    listCardsSource.splice(indexSource, 1);
    listCardsDestination.splice(indexDestination, 0, card);

    let dataReq = {
      boardId,
      listSourceId,
      listDestinationId,
      data: {
        listCardsSource: {
          cards: listCardsSource.map((card) => card._id),
        },
        listCardsDestination: {
          cards: listCardsDestination.map((card) => card._id),
        },
      },
    };

    updatePositionCards(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success("Cập nhật vị trí thẻ nhiệm vụ thành công");
          createAction({
            boardId,
            data: {
              action: `di chuyển thẻ ${card.title} từ danh sách ${listSource.title} đến danh sách ${listDestination.title}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else message.error("Cập nhật vị trí thẻ nhiệm vụ thất bại");
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error("Cập nhật vị trí thẻ nhiệm vụ thất bại");
      });
  };

  return (
    <div>
      <MoveCardForm
        lists={listTasksReducer}
        card={cardTaskReducer}
        handleMoveCard={handleMoveCard}
      />
    </div>
  );
}

export default MoveCardContainer;
