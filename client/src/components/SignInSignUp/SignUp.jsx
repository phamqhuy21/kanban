import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";

SignUp.propTypes = {};

const style = {
  btnLoginStyle: {
    width: "100%",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
  },
};

const { Item } = Form;

function SignUp(props) {
  return (
    <React.Fragment>
      <Item
        name="email"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống email!",
          },
        ]}
      >
        <Input placeholder="Nhập email"></Input>
      </Item>
      <Item
        name="username"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống tên tài khoản!",
          },
        ]}
      >
        <Input placeholder="Nhập tên tài khoản"></Input>
      </Item>
      <Item
        name="fullname"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống tên đầy đủ!",
          },
        ]}
      >
        <Input placeholder="Nhập tên đầy đủ"></Input>
      </Item>
      <Item
        name="password"
        rules={[
          {
            required: true,
            message: "Không được bỏ trống mật khẩu!",
          },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu"></Input.Password>
      </Item>
      <Item>
        <Button style={style.btnLoginStyle} htmlType="submit">
          Đăng ký
        </Button>
      </Item>
    </React.Fragment>
  );
}

export default SignUp;
