import React from "react";
import PropTypes from "prop-types";
import ManageUser from "../../components/GlobalMenu/ManageUser";
import { useSelector } from "react-redux";

ManageUserContainer.propTypes = {};

function ManageUserContainer(props) {
  const usersReducer = useSelector((state) => state.usersReducer);
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)",
      }}
    >
      <ManageUser user={usersReducer} />
    </div>
  );
}

export default ManageUserContainer;
