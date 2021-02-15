import React from "react";
import KanBan from "../containers/KanBan";
import SignInSignUpContainer from "../containers/SignInSignUp/SignInSignUpContainer";
import ManageBoardContainer from "../containers/ManageBoards/ManageBoardContainer";
import NotFound from "../components/NotFound/NotFound";
import UserContainer from "../containers/User/UserContainer";

const routes = [
  {
    path: "/board/:id",
    exact: true,
    component: () => <KanBan />,
  },
  {
    path: "/boards",
    exact: true,
    component: () => <ManageBoardContainer />,
  },
  {
    path: "/signIn",
    exact: true,
    component: () => <SignInSignUpContainer />,
  },
  {
    path: "/signUp",
    exact: true,
    component: () => <SignInSignUpContainer />,
  },
  {
    path: "/user/:username/information",
    exact: true,
    component: () => <UserContainer />,
  },
  {
    path: "/user/:username/activity",
    exact: true,
    component: () => <UserContainer />,
  },
  { path: "*", component: () => <NotFound /> },
];

export default routes;
