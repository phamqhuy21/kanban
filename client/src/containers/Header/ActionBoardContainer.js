import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ActionBoard from "../../components/Header/ActionBoard";
import Scrollbar from "../../components/Scrollbar/Scrollbar";

ActionBoardContainer.propTypes = {};

function ActionBoardContainer(props) {
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);

  return (
    <Scrollbar styleScrollbar={{ maxHeight: "80vh" }}>
      {detailBoardReducer.actions.length > 0
        ? detailBoardReducer.actions
            .sort((prev, next) => {
              return (
                new Date(next.createdAt).valueOf() -
                new Date(prev.createdAt).valueOf()
              );
            })
            .map((action, index) => <ActionBoard action={action} key={index} />)
        : null}
    </Scrollbar>
  );
}

export default ActionBoardContainer;
