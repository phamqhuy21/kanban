import React, { useState } from "react";
import PropTypes from "prop-types";
import MemberForm from "../../components/Board/AddToCard/MemberForm";
import { Button, Dropdown, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { cloneDeep, findIndex } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { updateCardTask } from "../../api/cardTask";
import { getDataCardReq } from "../../redux/actions/cardTask";
import {
  addMemberRequest,
  deleteMemberRequest,
} from "../../redux/actions/board";
import { getBoardDetailReq } from "../../redux/actions/boards";

MemberFormContainer.propTypes = {};

const style = {
  styleButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    marginBottom: "1vh",
  },
};

function MemberFormContainer(props) {
  const match = useRouteMatch();
  const [visible, setVisisble] = useState(false);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();

  const handleAddMember = async (mem, card) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let members = cloneDeep(card.members);
    let index = await members.findIndex((member) => {
      return member === mem._id;
    });
    if (index === -1) {
      await members.push(mem._id);
    } else {
      await members.splice(index, 1);
    }

    let dataReq = {
      boardId,
      cardId,
      data: {
        members,
      },
    };
    updateCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success("Thêm thành viên vào thẻ thành công");
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
        } else message.error("Thêm thành viên vào thẻ thất bại");
      })
      .catch((err) => {
        message.error("Thêm thành viên vào thẻ thất bại");
      });
    // if (
    //   findIndex(card.members, function (member) {
    //     return member.alias === mem.alias;
    //   }) !== -1
    // ) {
    //   dispatch(deleteMemberRequest(card.id, mem));
    // } else {
    //   dispatch(addMemberRequest(card.id, mem));
    // }
  };

  return (
    <Dropdown
      overlay={
        <MemberForm handleAddMember={handleAddMember} card={cardTaskReducer} />
      }
      trigger="click"
      visible={visible}
      onVisibleChange={(flag) => {
        setVisisble(flag);
      }}
    >
      <Button style={style.styleButton}>
        <UserOutlined />
        Thành viên
      </Button>
    </Dropdown>
  );
}

export default MemberFormContainer;
