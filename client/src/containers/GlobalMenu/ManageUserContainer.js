import React, { useState } from "react";
import PropTypes from "prop-types";
import ManageUser from "../../components/GlobalMenu/ManageUser";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "antd";

ManageUserContainer.propTypes = {};

const style = {
  btnStyle: {
    margin: "0 0.1vw",
    background: "hsla(0,0%,100%,.3)",
    color: "#fff",
    border: "none",
  },
};

function ManageUserContainer(props) {
  const [visible, setVisible] = useState();
  const usersReducer = useSelector((state) => state.usersReducer);

  const handleCloseDropdown = () => {
    setVisible(false);
  };

  return (
    <Dropdown
      overlay={
        <div
          style={{
            padding: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)",
          }}
        >
          <ManageUser
            user={usersReducer}
            handleCloseDropdown={handleCloseDropdown}
          />
        </div>
      }
      placement="bottomRight"
      trigger="click"
      visible={visible}
      onVisibleChange={(flag) => {
        setVisible(flag);
      }}
    >
      <Button
        shape="circle"
        style={{ ...style.btnStyle, background: "hsla(0,0%,100%,.6)" }}
      >
        <b>{usersReducer.alias}</b>
      </Button>
    </Dropdown>
  );
}

export default ManageUserContainer;
