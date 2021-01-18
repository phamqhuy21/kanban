import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown } from "antd";
import { HomeOutlined, TableOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ManageUserContainer from "../../containers/GlobalMenu/ManageUserContainer";
import SwitchBoardContainer from "../../containers/GlobalMenu/SwitchBoardContainer";

GlobalMenu.propTypes = {};

const style = {
  btnStyle: {
    margin: "0 0.1vw",
    background: "hsla(0,0%,100%,.3)",
    color: "#fff",
    border: "none",
  },
};

function GlobalMenu(props) {
  const { usersReducer } = props;

  return (
    <React.Fragment>
      {Object.keys(usersReducer).length > 0 ? (
        <React.Fragment>
          <div className="left-menu">
            <Link to="/boards">
              <Button style={style.btnStyle}>
                <HomeOutlined />
              </Button>
            </Link>
            <Dropdown
              overlay={<SwitchBoardContainer />}
              placement="bottomLeft"
              trigger="click"
            >
              <Button style={style.btnStyle}>
                <TableOutlined />
                Bảng
              </Button>
            </Dropdown>
          </div>
          <div className="right-menu">
            <Dropdown
              overlay={<ManageUserContainer />}
              placement="bottomRight"
              trigger="click"
            >
              <Button
                shape="circle"
                style={{ ...style.btnStyle, background: "hsla(0,0%,100%,.6)" }}
              >
                <b>{usersReducer.alias}</b>
              </Button>
            </Dropdown>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default GlobalMenu;
