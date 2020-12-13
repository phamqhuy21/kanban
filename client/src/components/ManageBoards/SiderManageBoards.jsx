import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { TableOutlined } from "@ant-design/icons";

SiderManageBoards.propTypes = {};

const { SubMenu } = Menu;

function SiderManageBoards(props) {
  return (
    <React.Fragment>
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<TableOutlined />}>
          <b>Bảng</b>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

export default SiderManageBoards;
