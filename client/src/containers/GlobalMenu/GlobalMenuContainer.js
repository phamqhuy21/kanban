import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import GlobalMenu from "../../components/GlobalMenu/GlobalMenu";
import { useRouteMatch } from "react-router-dom";

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
  const accessToken = localStorage.getItem("accessToken");

  return (
    <React.Fragment>
      {accessToken ? (
        <Layout.Header style={style.headerStyle}>
          <GlobalMenu />
        </Layout.Header>
      ) : null}
    </React.Fragment>
  );
}

export default GlobalMenuContainer;
