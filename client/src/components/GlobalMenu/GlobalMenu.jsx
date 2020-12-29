import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { HomeOutlined, TableOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserReq } from "../../redux/actions/user";

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
  const usersReducer = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserReq());
  }, [dispatch]);

  return (
    <React.Fragment>
      {Object.keys(usersReducer).length > 0 ? (
        <React.Fragment>
          <div className="left-menu">
            <Button style={style.btnStyle}>
              <HomeOutlined />
            </Button>
            <Link to="/boards">
              <Button style={style.btnStyle}>
                <TableOutlined />
                Bảng
              </Button>
            </Link>
          </div>
          <div className="right-menu">
            <Button
              shape="circle"
              style={{ ...style.btnStyle, background: "hsla(0,0%,100%,.6)" }}
            >
              <b>{usersReducer.alias}</b>
            </Button>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

export default GlobalMenu;
