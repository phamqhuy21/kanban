import React from "react";
import PropTypes from "prop-types";
import { Card, Divider, Form } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import Lottie from "react-lottie-player";

SignUnSignUp.propTypes = {
  handleSignIn: PropTypes.func,
  handleSignUp: PropTypes.func,
};

const style = {
  coverStyle: { textAlign: "center", background: "#fff" },
  coverCardStyle: { display: "flex", flex: "auto", justifyContent: "center" },
  bodyCard: { width: "350px", boxShadow: "5px 10px 5px 5px #888888" },
  coverLottieStyle: { position: "fixed", bottom: 0 },
  lottieStyle: {
    width: "500px",
    height: "250px",
  },
};

function SignUnSignUp(props) {
  const { children, handleSignUp, handleSignIn } = props;
  const [form] = Form.useForm();
  const match = useRouteMatch();
  const { path } = match;
  return (
    <div style={style.coverStyle}>
      <h1>Trello</h1>
      <div style={style.coverCardStyle}>
        <Card bodyStyle={style.bodyCard}>
          {path === "/signIn" ? (
            <p>Đăng nhập vào trello</p>
          ) : (
            <p>Đăng ký tài khoản của bạn</p>
          )}
          <Form
            form={form}
            onFinish={(value) => {
              if (path === "/signIn") {
                handleSignIn(value);
              }
              if (path === "/signUp") {
                handleSignUp(value);
              }
            }}
          >
            {children}
          </Form>
          <Divider />
          {path === "/signIn" ? (
            <Link to="/signUp">
              <p>Đăng ký tài khoản</p>
            </Link>
          ) : (
            <Link to="/signIn">
              <p>Đăng nhập</p>
            </Link>
          )}
        </Card>
      </div>
      <div style={{ ...style.coverLottieStyle, left: 0 }}>
        <Lottie
          loop
          animationData={require(`../../assets/json/kanban1.json`)}
          play
          speed={1}
          style={style.lottieStyle}
        />
      </div>
      <div style={{ ...style.coverLottieStyle, right: 0 }}>
        <Lottie
          loop
          animationData={require(`../../assets/json/kanban2.json`)}
          play
          speed={1}
          style={style.lottieStyle}
        />
      </div>
    </div>
  );
}

export default SignUnSignUp;
