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
      <Item name="username">
        <Input placeholder="Nhập tên đăng nhập"></Input>
      </Item>
      <Item name="password">
        <Input.Password placeholder="Nhập mật khẩu"></Input.Password>
      </Item>
      <Item>
        <Button style={style.btnLoginStyle} htmlType="submit">
          Đăng nhập
        </Button>
      </Item>
    </React.Fragment>
  );
}

export default SignIn;
