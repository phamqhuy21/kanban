import React from "react";
import KanBan from "../containers/KanBan";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <KanBan />,
  },
];

export default routes;
