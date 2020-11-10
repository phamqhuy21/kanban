import { Layout } from "antd";
import React from "react";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import BoardContainer from "./BoardContainer";

function KanBan(props) {
  return (
    <Layout>
      <Header />
      <Content>
        <BoardContainer />
      </Content>
    </Layout>
  );
}

export default KanBan;
