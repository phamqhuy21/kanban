import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DetailCard from "../components/Board/DetailCard/DetailCard";
import { useDispatch, useSelector } from "react-redux";
import { addCommentRequest, endExDateRequest } from "../redux/actions/board";
import { cloneDeep, filter } from "lodash";

DetailcardContainer.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    exDate: PropTypes.object,
  }),
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

function DetailcardContainer(props) {
  const { card, visible, setVisible } = props;
  const [stateCard, setStateCard] = useState(card);
  const user = useSelector((state) => state.user);
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setVisible(false);
  };

  const addComment = (comment) => {
    dispatch(addCommentRequest(card.id, comment));
  };

  const handleCheckSuccess = (e) => {
    const newDate = cloneDeep(card.exDate);

    if (e.target.checked) {
      newDate.successed = true;
      dispatch(endExDateRequest(card.id, newDate));
    } else {
      newDate.successed = false;
      dispatch(endExDateRequest(card.id, newDate));
    }
  };

  useEffect(() => {
    board.forEach((el) => {
      let fil = filter(el.task, function (o) {
        return o.id === card.id;
      });
      if (fil.length > 0) setStateCard(fil[0]);
    });
  });

  return (
    <DetailCard
      stateCard={stateCard}
      visible={visible}
      handleCancel={handleCancel}
      user={user}
      addComment={addComment}
      handleCheckSuccess={handleCheckSuccess}
    />
  );
}

export default DetailcardContainer;
