import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ManageUser from "../../components/User/User";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { getUserReq } from "../../redux/actions/user";
import GlobalMenuContainer from "../GlobalMenu/GlobalMenuContainer";

UserContainer.propTypes = {};

function UserContainer(props) {
  const usersReducer = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      Date.now() <
        jwt_decode(localStorage.getItem("accessToken")).exp * 1000 - 60000
    ) {
      dispatch(getUserReq());
    }
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <GlobalMenuContainer />
      {Object.keys(usersReducer).length > 0 ? (
        <ManageUser user={usersReducer} />
      ) : null}
    </div>
  );
}

export default UserContainer;
