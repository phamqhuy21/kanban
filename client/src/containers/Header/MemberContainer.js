import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, message, Modal, Popover } from "antd";
import { updateBoard } from "../../api/boards";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { createAction } from "../../api/action";
import { useRouteMatch } from "react-router-dom";
import MemberHeader from "../../components/Header/MemberHeader";

MemberContainer.propTypes = {};

function MemberContainer(props) {
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const usersReducer = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleDeleteMember = (memberDelete) => {
    Modal.confirm({
      title: `Xóa thành viên ${memberDelete.fullname} khỏi bảng`,
      content: "Bạn có chắc chắn muốn xóa không ?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        let boardId = match.params.id;
        let members = detailBoardReducer.members.filter(
          (member) => member._id !== memberDelete._id
        );
        let dataReq = {
          members: members.map((member) => {
            return member._id;
          }),
        };
        updateBoard(boardId, dataReq)
          .then((res) => {
            if (res.status === 200) {
              message.success("Xóa thành viên thành công");
              dispatch(getBoardDetailReq(boardId));
              createAction({
                boardId,
                data: {
                  action: `xóa thành viên ${memberDelete.fullname} khỏi bảng`,
                },
              }).then((res) => {
                if (res.status === 200) {
                  dispatch(getBoardDetailReq(boardId));
                }
              });
            } else message.error("Xóa thành viên thất bại");
          })
          .catch((err) => {
            message.error("Xóa thành viên thất bại");
          });
      },
    });
  };

  return (
    <React.Fragment>
      {detailBoardReducer.members.map((member, index) => (
        <div key={index}>
          <Badge
            offset={[0, 5]}
            count={
              detailBoardReducer.admin._id === usersReducer.id &&
              member._id !== usersReducer.id ? (
                <CloseCircleOutlined
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#f44336",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    handleDeleteMember(member);
                  }}
                />
              ) : null
            }
          >
            <Popover content={<MemberHeader member={member} />}>
              <Avatar
                icon={<p>{member.alias}</p>}
                style={{
                  marginLeft: "10px",
                  color: "#424242",
                  fontWeight: "500",
                  cursor: "context-menu",
                  backgroundColor:
                    member._id !== usersReducer.id ? "" : "#ffab91",
                }}
              />
            </Popover>
          </Badge>
        </div>
      ))}
    </React.Fragment>
  );
}

export default MemberContainer;
