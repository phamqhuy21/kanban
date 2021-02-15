import React from "react";
import PropTypes from "prop-types";
import { Avatar, Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";

ManageUser.propTypes = {};

function ManageUser(props) {
  const { user, handleCloseDropdown } = props;

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <p>Tài khoản</p>
        <Divider style={{ margin: "10px 0" }} />
      </div>
      <Row style={{ minWidth: "250px" }}>
        <Col span={5} style={{ marginRight: "10px", textAlign: "center" }}>
          <Avatar
            icon={<p>{user.alias}</p>}
            size={50}
            style={{
              color: "#424242",
              fontWeight: "500",
              cursor: "context-menu",
            }}
          />
        </Col>
        <Col span={18}>
          <p style={{ marginBottom: "0", fontWeight: "500" }}>
            {user.fullname}
          </p>
          <p style={{ marginBottom: "0", fontSize: "0.85em", opacity: "0.6" }}>
            {user.email}
          </p>
        </Col>
      </Row>
      <Divider style={{ margin: "10px 0" }} />
      <div style={{ fontWeight: "500", paddingLeft: "10px" }}>
        <Link
          style={{ color: "#212121" }}
          to={`/user/${user.username}/information`}
          onClick={handleCloseDropdown}
        >
          <p>Hồ sơ</p>
        </Link>
        <Link
          style={{ color: "#212121" }}
          to={`/user/${user.username}/activity`}
          onClick={handleCloseDropdown}
        >
          <p>Hoạt động</p>
        </Link>
      </div>
      <Divider style={{ margin: "10px 0" }} />
      <div style={{ fontWeight: "500", paddingLeft: "10px" }}>
        <Link to="/signIn">
          <p style={{ marginBottom: 0 }}>Đăng xuất</p>
        </Link>
      </div>
    </div>
  );
}

export default ManageUser;
