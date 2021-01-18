import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SwitchBoard from "../../components/GlobalMenu/SwitchBoard";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

SwitchBoardContainer.propTypes = {};

function SwitchBoardContainer(props) {
  const [valueSearch, setValueSearch] = useState("");
  const [boardsState, setBoardsState] = useState();
  const boardsReducer = useSelector((state) => state.boardsReducer);
  let history = useHistory();

  const handleSelectBoard = (boardId) => {
    history.push(`/board/${boardId}`);
  };

  const handleSearch = (value) => {
    setValueSearch(value);
    let boardsFilter = boardsReducer.filter((board) => {
      return board.title.includes(value);
    });
    setBoardsState(boardsFilter);
  };

  useEffect(() => {
    setBoardsState(boardsReducer);
  }, [boardsReducer]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "7px 7px",
        boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <Input
          style={{
            padding: "5px 5px 5px 15px",
            borderRadius: "4px",
            border: "1px solid #bdbdbd",
          }}
          value={valueSearch}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          suffix={
            <Button shape="circle" style={{ border: "none" }}>
              <SearchOutlined />
            </Button>
          }
        />
      </div>
      {boardsState
        ? boardsState.map((board, index) => {
            return (
              <SwitchBoard
                board={board}
                handleSelectBoard={handleSelectBoard}
                key={index}
              />
            );
          })
        : null}
    </div>
  );
}

export default SwitchBoardContainer;
