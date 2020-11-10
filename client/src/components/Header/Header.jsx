import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

function Headers(props) {
  return (
    <Header
      style={{
        backgroundColor: "rgba(5%, 50%, 10%,0.7)",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#fafafa" }}>Trello</h1>
    </Header>
  );
}

export default Headers;
