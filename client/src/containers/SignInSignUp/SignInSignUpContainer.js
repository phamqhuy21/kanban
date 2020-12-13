import React from "react";
import PropTypes from "prop-types";
import SignIn from "../../components/SignInSignUp/SignIn";
import SignUnSignUp from "../../components/SignInSignUp/SignUnSignUp";
import { useRouteMatch } from "react-router-dom";
import SignUp from "../../components/SignInSignUp/SignUp";

SignInSignUpContainer.propTypes = {};

function SignInSignUpContainer(props) {
  const match = useRouteMatch();
  return (
    <SignUnSignUp>
      {match.params.action === "signIn" ? <SignIn /> : <SignUp />}
    </SignUnSignUp>
  );
}

export default SignInSignUpContainer;
