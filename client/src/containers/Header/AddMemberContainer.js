import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, message } from "antd";
import AddMemberForm from "../../components/Header/AddMemberForm";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { updateBoard } from "../../api/boards";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { createAction } from "../../api/action";

AddMemberContainer.propTypes = {};

function AddMemberContainer(props) {
  const [visible, setVisible] = useState(false);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const handleCloseForm = () => {
    setVisible(false);
  };

  const handleAddMember = (email) => {
    let boardId = match.params.id;
    let dataReq = {
      email,
    };
    updateBoard(boardId, dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          handleCloseForm();
          createAction({
            boardId,
            data: {
              action: `thêm thành viên vào bảng`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error("Không thêm được thành viên vào bảng");
        }
      })
      .catch((err) => {
        message.error("Không thêm được thành viên vào bảng");
      });
  };

  return (
    <Dropdown
      overlay={
        <AddMemberForm
          handleCloseForm={handleCloseForm}
          handleAddMember={handleAddMember}
        />
      }
      placement="bottomLeft"
      trigger="click"
      visible={visible}
      onVisibleChange={(flag) => {
        setVisible(flag);
      }}
    >
      <Button
        style={{
          marginLeft: "10px",
          backgroundColor: "hsla(0,0%,100%,0.24)",
          border: "none",
        }}
        type="primary"
      >
        Thêm thành viên
      </Button>
    </Dropdown>
  );
}

export default AddMemberContainer;
