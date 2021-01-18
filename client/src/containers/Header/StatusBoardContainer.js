import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { updateBoard } from "../../api/boards";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { createAction } from "../../api/action";

StatusBoardContainer.propTypes = {};

function StatusBoardContainer(props) {
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const usersReducer = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleStatus = (done) => {
    let boardId = match.params.id;
    let dataReq = {
      done,
    };
    updateBoard(boardId, dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          createAction({
            boardId,
            data: {
              action: done
                ? `chuyển bảng sang trạng thái hoàn thành`
                : `chuyển bảng sang trạng thái chưa hoàn thành`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error("Không thay đổi được trạng thái bảng");
        }
      })
      .catch((err) => {
        message.error("Không thay đổi được trạng thái bảng");
      });
  };

  return (
    <React.Fragment>
      {detailBoardReducer.admin._id === usersReducer.id ? (
        <React.Fragment>
          {detailBoardReducer.done ? (
            <Button
              style={{
                marginLeft: "10px",
                backgroundColor: "hsla(0,0%,100%,0.24)",
                border: "none",
              }}
              type="primary"
              onClick={() => {
                handleStatus(false);
              }}
            >
              <CheckOutlined />
              Hoàn thành
            </Button>
          ) : (
            <Button
              style={{
                marginLeft: "10px",
                backgroundColor: "hsla(0,0%,100%,0.24)",
                border: "none",
              }}
              type="primary"
              onClick={() => {
                handleStatus(true);
              }}
              disabled={
                detailBoardReducer.admin._id === usersReducer.id ? false : true
              }
            >
              Chưa hoàn thành
            </Button>
          )}
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default StatusBoardContainer;
