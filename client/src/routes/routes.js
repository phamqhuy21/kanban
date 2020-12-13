import React from "react";
import KanBan from "../containers/KanBan";
import SignInSignUpContainer from "../containers/SignInSignUp/SignInSignUpContainer";
import ManageBoardContainer from "../containers/ManageBoards/ManageBoardContainer";

const routes = [
  {
    path: "/board/:id",
    exact: true,
    component: () => <KanBan />,
  },
  {
    path: "/:username/boards",
    exact: true,
    component: () => <ManageBoardContainer />,
  },
  {
    path: "/:action",
    exact: true,
    component: () => <SignInSignUpContainer />,
  },
];

export default routes;
