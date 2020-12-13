import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { HomeOutlined, TableOutlined } from "@ant-design/icons";

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
  return (
    <React.Fragment>
      <div className="left-menu">
        <Button style={style.btnStyle}>
          <HomeOutlined />
        </Button>
        <Button style={style.btnStyle}>
          <TableOutlined />
          Bảng
        </Button>
      </div>
      <div className="right-menu">
        <Button
          shape="circle"
          style={{ ...style.btnStyle, background: "hsla(0,0%,100%,.6)" }}
        >
          <b>PH</b>
        </Button>
      </div>
    </React.Fragment>
  );
}

export default GlobalMenu;
