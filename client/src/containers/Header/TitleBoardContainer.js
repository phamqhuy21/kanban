import React, { useState } from "react";
import PropTypes from "prop-types";
import TitleBoard from "../../components/Header/TitleBoard";
import { useRouteMatch } from "react-router-dom";
import { updateBoard } from "../../api/boards";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { createAction } from "../../api/action";

TitleBoardContainer.propTypes = {};

function TitleBoardContainer(props) {
  const { board } = props;
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const closeForm = (valueTitle) => {
    let boardId = match.params.id;
    let dataReq = { title: valueTitle };
    updateBoard(boardId, dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          setOpenForm(false);
          createAction({
            boardId,
            data: {
              action: `cập nhật tiêu đề bảng thành ${valueTitle}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error("Không cập nhật được tiêu đề bảng");
        }
      })
      .catch((err) => {
        message.error("Không cập nhật được tiêu đề bảng");
      });
  };

  return (
    <React.Fragment>
      {openForm ? (
        <TitleBoard title={board.title} closeForm={closeForm} />
      ) : (
        <h1
          className="title-detail-board"
          onClick={() => {
            setOpenForm(true);
          }}
          style={{
            color: "#fff",
            marginBottom: 0,
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          {board.title}
        </h1>
      )}
    </React.Fragment>
  );
}

export default TitleBoardContainer;
