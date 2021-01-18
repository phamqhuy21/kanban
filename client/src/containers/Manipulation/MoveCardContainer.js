import React from "react";
import PropTypes from "prop-types";
import MoveCardForm from "../../components/Board/Manupulation/MoveCardForm";
import { useSelector } from "react-redux";

MoveCardContainer.propTypes = {};

function MoveCardContainer(props) {
  const listTasksReducer = useSelector((state) => state.listTasksReducer);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);

  return (
    <div>
      <MoveCardForm lists={listTasksReducer} card={cardTaskReducer} />
    </div>
  );
}

export default MoveCardContainer;
