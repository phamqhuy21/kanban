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
  coverStyle: {
    textAlign: "center",
    paddingTop: "10vh",
    background: "#fff",
    minHeight: "100vh",
  },
  coverCardStyle: { display: "flex", flex: "auto", justifyContent: "center" },
  bodyCard: { width: "350px", boxShadow: "5px 10px 5px 5px #888888" },
  coverLottieStyle: { position: "fixed" },
  lottieStyle: {
    width: "35vw",
    height: "35vh",
  },
};

function SignUnSignUp(props) {
  const { children, handleSignUp, handleSignIn } = props;
  const [form] = Form.useForm();
  const match = useRouteMatch();
  const { path } = match;
  return (
    <div style={style.coverStyle}>
      <h1 style={{ fontWeight: "bold" }}>Quản lý công việc</h1>
      <div style={style.coverCardStyle}>
        <Card bodyStyle={style.bodyCard}>
          {path === "/signIn" ? (
            <p style={{ fontWeight: "bold" }}>Đăng nhập vào hệ thống</p>
          ) : (
            <p style={{ fontWeight: "bold" }}>Đăng ký tài khoản của bạn</p>
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
      {/* <div style={{ ...style.coverLottieStyle, right: 0, top: 0 }}>
        <Lottie
          loop
          animationData={require(`../../assets/json/kanban3.json`)}
          play
          speed={1}
          style={style.lottieStyle}
        />
      </div> */}
      {/* <div style={{ ...style.coverLottieStyle, left: 0, bottom: 0 }}>
        <Lottie
          loop
          animationData={require(`../../assets/json/kanban4.json`)}
          play
          speed={1}
          style={style.lottieStyle}
        />
      </div> */}
      <div style={{ ...style.coverLottieStyle, left: 0, bottom: 0 }}>
        <Lottie
          loop
          animationData={require(`../../assets/json/kanban1.json`)}
          play
          speed={1}
          style={style.lottieStyle}
        />
      </div>
      <div style={{ ...style.coverLottieStyle, right: 0, bottom: 0 }}>
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
