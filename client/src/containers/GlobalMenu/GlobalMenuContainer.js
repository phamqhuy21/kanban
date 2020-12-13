import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import GlobalMenu from "../../components/GlobalMenu/GlobalMenu";

GlobalMenuContainer.propTypes = {};

const style = {
  headerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40px",
    backgroundColor: "#1565c0",
    color: "#fff",
  },
};

function GlobalMenuContainer(props) {
  return (
    <React.Fragment>
      <Layout.Header style={style.headerStyle}>
        <GlobalMenu />
      </Layout.Header>
    </React.Fragment>
  );
}

export default GlobalMenuContainer;
