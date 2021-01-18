import React from "react";
import PropTypes from "prop-types";

SwitchBoard.propTypes = {};

function SwitchBoard(props) {
  const { board, handleSelectBoard } = props;

  return (
    <div
      style={{
        backgroundColor: board.backgroundColor,
        padding: "7px 10px",
        marginBottom: "7px",
        fontSize: "1.2em",
        fontWeight: "500",
        color: "#fff",
        borderRadius: "4px",
        borderLeft: "10px solid rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      onClick={() => {
        handleSelectBoard(board._id);
      }}
    >
      {board.title}
    </div>
  );
}

export default SwitchBoard;
