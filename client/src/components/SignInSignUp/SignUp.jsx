import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";

SignUp.propTypes = {};

const style = {
  btnLoginStyle: { width: "100%", backgroundColor: "#4caf50", color: "#fff" },
};

const { Item } = Form;

function SignUp(props) {
  return (
    <React.Fragment>
      <Item>
        <Input placeholder="Nhập email"></Input>
      </Item>
      <Item>
        <Input placeholder="Nhập tên tài khoản"></Input>
      </Item>
      <Item>
        <Input placeholder="Nhập mật khẩu"></Input>
      </Item>
      <Item>
        <Button style={style.btnLoginStyle}>Đăng ký</Button>
      </Item>
    </React.Fragment>
  );
}

export default SignUp;
