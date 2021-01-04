import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

function Contents({ children }) {
  return <Content>{children}</Content>;
}

export default Contents;
