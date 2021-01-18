import { Layout } from "antd";
import React, { useEffect } from "react";
import Content from "../components/Content/Content";
import BoardContainer from "./BoardContainer";
import GlobalMenuContainer from "./GlobalMenu/GlobalMenuContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getBoardDetailReq, getBoardsReq } from "../redux/actions/boards";
import HeaderContainer from "./Header/HeaderContainer";

function KanBan(props) {
  const dispatch = useDispatch();
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(getBoardDetailReq(match.params.id));
    dispatch(getBoardsReq());
  }, [match.params.id, dispatch]);

  return (
    <React.Fragment>
      <GlobalMenuContainer />
      {Object.keys(detailBoardReducer).length > 0 ? (
        <Content>
          <Layout
            style={{
              backgroundColor: detailBoardReducer.backgroundColor,
              maxHeight: "100%",
            }}
          >
            <HeaderContainer />
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
