import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";

SignIn.propTypes = {};

const style = {
  btnLoginStyle: { width: "100%", backgroundColor: "#4caf50", color: "#fff" },
};

const { Item } = Form;

function SignIn(props) {
  return (
    <React.Fragment>
      <Item>
        <Input placeholder="Nhập email"></Input>
      </Item>
      <Item>
        <Input placeholder="Nhập mật khẩu"></Input>
      </Item>
      <Item>
        <Button style={style.btnLoginStyle}>Đăng nhập</Button>
      </Item>
    </React.Fragment>
  );
}

export default SignIn;
