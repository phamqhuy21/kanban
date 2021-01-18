import React from "react";
import PropTypes from "prop-types";
import { Avatar, Col, Row } from "antd";
import { Link } from "react-router-dom";

ManageUser.propTypes = {};

function ManageUser(props) {
  const { user } = props;

  return (
    <Row style={{ minWidth: "400px" }}>
      <Col span={8} style={{ marginRight: "10px", textAlign: "center" }}>
        <Avatar
          icon={<p>{user.alias}</p>}
          size={100}
          style={{
            color: "#424242",
            fontWeight: "500",
            cursor: "context-menu",
          }}
        />
      </Col>
      <Col span={15}>
        <p style={{ marginBottom: "5px", fontSize: "1.1em" }}>
          <b>Tên đăng nhập:</b> {user.username}
        </p>
        <p style={{ marginBottom: "5px", fontSize: "1.1em" }}>
          <b>Email:</b> {user.email}
        </p>
        <p style={{ marginBottom: "5px", fontSize: "1.1em" }}>
          <b>Họ tên:</b> {user.fullname}
        </p>
        <Link to="/signIn">
          <p style={{ marginBottom: 0 }}>Đăng xuất</p>
        </Link>
      </Col>
    </Row>
  );
}

export default ManageUser;
