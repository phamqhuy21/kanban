import React from "react";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import "./style.css";

ContentManageBoards.propTypes = {};

const style = {
  coverRoleBoard: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "2vh",
  },
  bodyCardStyle: {
    height: "100px",
    padding: "1.5vh 1vw",
    borderRadius: "3px",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
  },
};

function ContentManageBoards(props) {
  return (
    <div>
      <Row className="role-boards">
        <div style={style.coverRoleBoard}>
          <i className="fad fa-user"></i>
          <b style={{ marginLeft: "0.5vw" }}>Bảng Cá Nhân</b>
        </div>
      </Row>
      <Row>
        <Col span={6} style={{ marginRight: "1vw" }}>
          <Card className="card-board" bodyStyle={style.bodyCardStyle}>
            <p title="Chào mừng đến với trello">Chào mừng đến với trello</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bodyStyle={{
              ...style.bodyCardStyle,
              backgroundColor: "#e0e0e0",
              color: "#000000",
            }}
          >
            <p>Tạo bảng mới</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ContentManageBoards;
