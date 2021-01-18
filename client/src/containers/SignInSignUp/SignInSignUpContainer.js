import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SignIn from "../../components/SignInSignUp/SignIn";
import SignUnSignUp from "../../components/SignInSignUp/SignUnSignUp";
import { useHistory, useRouteMatch } from "react-router-dom";
import SignUp from "../../components/SignInSignUp/SignUp";
import { signIn, signUp } from "../../api/user";
import { message } from "antd";
import NotFound from "../../components/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/actions/user";
import { resetBoard } from "../../redux/actions/boards";

SignInSignUpContainer.propTypes = {};

function SignInSignUpContainer(props) {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignUp = (value) => {
    let data = {
      ...value,
    };
    signUp(data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("Tạo tài khoản thành công");
          history.push("/signIn");
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error("Đăng ký thất bại!");
      });
  };

  const handleSignIn = (value) => {
    let data = {
      ...value,
    };
    signIn(data)
      .then((res) => {
        if (res.status === 200) {
          message.success(res.data.message);
          localStorage.setItem("accessToken", res.data.data.accessToken);
          dispatch(signInUser(res.data.data));
          history.push(`/boards`);
        }
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error("Đăng nhập thất bại!");
      });
  };

  useEffect(() => {
    localStorage.removeItem("accessToken");
    dispatch(resetBoard());
  }, []);

  return (
    <React.Fragment>
      <SignUnSignUp handleSignUp={handleSignUp} handleSignIn={handleSignIn}>
        {match.path === "/signIn" ? (
          <SignIn />
        ) : match.path === "/signUp" ? (
          <SignUp />
        ) : null}
      </SignUnSignUp>
    </React.Fragment>
  );
}

export default SignInSignUpContainer;
