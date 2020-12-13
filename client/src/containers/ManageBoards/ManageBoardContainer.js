import React from "react";
import PropTypes from "prop-types";
import { Col, Layout, Row } from "antd";
import SiderManageBoards from "../../components/ManageBoards/SiderManageBoards";
import ContentManageBoards from "../../components/ManageBoards/ContentManageBoards";

ManageBoardContainer.propTypes = {};

const { Sider, Content } = Layout;

function ManageBoardContainer(props) {
  return (
    <div style={{ padding: "2vh 15vw" }}>
      <Row>
        <Col span={7}>
          <SiderManageBoards />
        </Col>
        <Col span={16} offset={1}>
          <ContentManageBoards />
        </Col>
      </Row>
    </div>
  );
}

export default ManageBoardContainer;
