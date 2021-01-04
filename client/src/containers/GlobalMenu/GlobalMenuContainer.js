import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import GlobalMenu from "../../components/GlobalMenu/GlobalMenu";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserReq } from "../../redux/actions/user";

GlobalMenuContainer.propTypes = {};

const style = {
  headerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5px",
    height: "40px",
    color: "#fff",
  },
};

function GlobalMenuContainer(props) {
  const accessToken = localStorage.getItem("accessToken");
  const usersReducer = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(getUserReq());
  }, [dispatch]);

  return (
    <React.Fragment>
      {accessToken ? (
        <Layout.Header
          style={{
            ...style.headerStyle,
            backgroundColor: match.params.id ? "rgba(0,0,0,0.3)" : "#4caf50",
          }}
        >
          <GlobalMenu usersReducer={usersReducer} />
        </Layout.Header>
      ) : null}
    </React.Fragment>
  );
}

export default GlobalMenuContainer;
