import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Layout, message, Row } from "antd";
import SiderManageBoards from "../../components/ManageBoards/SiderManageBoards";
import ContentManageBoards from "../../components/ManageBoards/ContentManageBoards";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsReq } from "../../redux/actions/boards";
import { Redirect } from "react-router-dom";
import GlobalMenuContainer from "../GlobalMenu/GlobalMenuContainer";
import CreateBoardContainer from "./CreateBoardContainer";
import { getUserReq } from "../../redux/actions/user";
import { createBoard } from "../../api/boards";

ManageBoardContainer.propTypes = {};

const style = {
  contentStyle: { background: "#fff" },
};

const { Content } = Layout;

function ManageBoardContainer(props) {
  const [openFormCreate, setOpenFormCreate] = useState(false);
  const dispatch = useDispatch();
  const boardsReducer = useSelector((state) => state.boardsReducer);

  const handleOpenFormCreate = () => {
    setOpenFormCreate(true);
  };

  const handleCloseFormCreate = () => {
    setOpenFormCreate(false);
  };

  const handleCreateBoard = (title, color) => {
    setOpenFormCreate(false);
    createBoard({ title, color })
      .then((res) => {
        if (res.status === 200) {
          message.success("Tạo bảng thành công");
          dispatch(getBoardsReq());
        } else message.error("Tạo bảng thất bại");
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error("Tạo bảng thất bại");
      });
  };

  useEffect(() => {
    dispatch(getUserReq());
    dispatch(getBoardsReq());
  }, [dispatch]);

  if (!localStorage.getItem("accessToken")) {
    return <Redirect to="/signIn" />;
  }

  return (
    <React.Fragment>
      <GlobalMenuContainer />
      <Content style={style.contentStyle}>
        <div style={{ padding: "2vh 15vw" }}>
          <Row>
            <Col span={7}>
              <SiderManageBoards />
            </Col>
            <Col span={16} offset={1}>
              <ContentManageBoards
                boards={boardsReducer}
                openFormCreate={openFormCreate}
                handleOpenFormCreate={handleOpenFormCreate}
              >
                <CreateBoardContainer
                  openFormCreate={openFormCreate}
                  handleCloseFormCreate={handleCloseFormCreate}
                  handleCreateBoard={handleCreateBoard}
                />
              </ContentManageBoards>
            </Col>
          </Row>
        </div>
      </Content>
    </React.Fragment>
  );
}

export default ManageBoardContainer;
