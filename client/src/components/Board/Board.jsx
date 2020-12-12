import React, { useState } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button, Row } from "antd";
import { useSelector } from "react-redux";
import FormAddList from "./List/FormAddList";
import { PlusOutlined } from "@ant-design/icons";
import "./Board.css";

Board.propTypes = {
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  renderBoard: PropTypes.func,
  handleAddList: PropTypes.func,
};

const style = {
  statusCoverStyle: {
    backgroundColor: "#fff",
    visibility: "hidden",
    height: "12vh",
  },
  boardCoverStyle: {
    height: "100vh",
  },
};

const getDropStyle = () => {
  return {
    width: "100%",
    height: "89vh",
    marginBottom: "1.5vh",
    display: "flex",
    justifyContent: "flex-start",
    overflow: "auto",
    flexWrap: "nowrap",
  };
};

function Board(props) {
  const { onDragEnd, onDragStart, renderBoard, handleAddList } = props;
  const data = useSelector((state) => state.board);
  const [visibleAddList, setVisibleAddList] = useState(false);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, data);
      }}
      onDragStart={onDragStart}
    >
      <Row style={style.boardCoverStyle}>
        <Droppable droppableId="board" type="KANBAN" direction="horizontal">
          {(provided, snapshot) => {
            return (
              <React.Fragment>
                <div
                  id="scroll-board"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getDropStyle()}
                >
                  {renderBoard(data)}
                  {provided.placeholder}
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: "20%",
                      margin: "1vh",
                      backgroundColor: "none",
                      fontWeight: "bold",
                      fontFamily:
                        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
                    }}
                  >
                    {visibleAddList ? (
                      <FormAddList
                        setVisible={setVisibleAddList}
                        handleAddList={handleAddList}
                      />
                    ) : (
                      <Button
                        className="btn-open-addList"
                        onClick={() => {
                          setVisibleAddList(true);
                        }}
                      >
                        <div></div>
                        <PlusOutlined /> Thêm danh sách khác
                      </Button>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          }}
        </Droppable>
      </Row>
    </DragDropContext>
  );
}

export default Board;
