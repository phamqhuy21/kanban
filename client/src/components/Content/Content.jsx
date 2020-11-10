import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

function Contents({ children }) {
  return <Content style={{ backgroundColor: "#81c784" }}>{children}</Content>;
}

export default Contents;
