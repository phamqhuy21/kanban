import React from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import { TableOutlined } from "@ant-design/icons";

SiderManageBoards.propTypes = {};

const style = { iconStyle: { marginRight: "7px" } };

const { SubMenu } = Menu;

function SiderManageBoards(props) {
  const { handleSelectTypeBoard } = props;
  return (
    <React.Fragment>
      <Menu
        defaultSelectedKeys={["progress"]}
        mode="inline"
        onSelect={(event) => {
          handleSelectTypeBoard(event.key);
        }}
      >
        <Menu.Item
          key="progress"
          icon={
            <i className="fad fa-clipboard-list" style={style.iconStyle}></i>
          }
        >
          <b>Bảng quản lý</b>
        </Menu.Item>
        <Menu.Item
          key="done"
          icon={
            <i className="fad fa-clipboard-check" style={style.iconStyle}></i>
          }
        >
          <b>Bảng đã hoàn thành</b>
        </Menu.Item>
        <Menu.Item
          key="recently"
          icon={<i className="fad fa-clipboard" style={style.iconStyle}></i>}
        >
          <b>Bảng đã tạo gần đây</b>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

export default SiderManageBoards;
