import { Layout } from "antd";
import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import BoardContainer from "./BoardContainer";
import GlobalMenuContainer from "./GlobalMenu/GlobalMenuContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getBoardDetailReq } from "../redux/actions/boards";

const style = {
  contentStyle: { background: "#fff" },
};

function KanBan(props) {
  const dispatch = useDispatch();
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const match = useRouteMatch();
  useEffect(() => {
    dispatch(getBoardDetailReq(match.params.id));
  }, []);

  return (
    <React.Fragment>
      <GlobalMenuContainer />
      {Object.keys(detailBoardReducer).length > 0 ? (
        <Content style={style.contentStyle}>
          <Layout>
            <Header />
            <Content>
              <BoardContainer />
            </Content>
          </Layout>
        </Content>
      ) : null}
    </React.Fragment>
  );
}

export default KanBan;
