import React, { useEffect } from "react";
import PropTypes from "prop-types";
import DetailCard from "../components/Board/DetailCard/DetailCard";
import { useDispatch, useSelector } from "react-redux";
import { endExDateRequest } from "../redux/actions/board";
import { cloneDeep } from "lodash";
import { getDataCardReq } from "../redux/actions/cardTask";
import { useRouteMatch } from "react-router-dom";
import { getDetailCardTask, updateCardTask } from "../api/cardTask";
import { Col, Layout, message, Row } from "antd";
import Label from "../components/Board/DetailCard/Label";
import DescriptionContainer from "./DetailCard/DescriptionContainer";
import AddToCardContainer from "./AddToCardContainer";
import { getLabelsBoardReq } from "../redux/actions/label";
import Member from "../components/Board/DetailCard/Member";
import { CreditCardOutlined } from "@ant-design/icons";
import FileAttachmentsContainer from "./DetailCard/FileAttachmentsContainer";
import ExpirationDate from "../components/Board/DetailCard/ExpirationDate";
import CommentContainer from "./DetailCard/CommentContainer";
import Manipulation from "../components/Board/Manupulation/Manipulation";
import { getBoardDetailReq } from "../redux/actions/boards";
import { createAction } from "../api/action";
import ActivityContainer from "./DetailCard/ActivityContainer";

DetailcardContainer.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    exDate: PropTypes.object,
  }),
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
};

const style = {
  coverItemStyle: {
    display: "flex",
    paddingLeft: "1vw",
  },
  siderStyle: { backgroundColor: "#f5f5f5" },
};

const { Content, Sider } = Layout;

function DetailcardContainer(props) {
  const { card, visible, setVisible } = props;
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCheckSuccess = (e) => {
    const newDate = cloneDeep(card.exDate);

    if (e.target.checked) {
      newDate.successed = true;
      dispatch(endExDateRequest(card._id, newDate));
    } else {
      newDate.successed = false;
      dispatch(endExDateRequest(card._id, newDate));
    }
  };

  const handleDeleteGround = () => {
    let cloneCard = cloneDeep(cardTaskReducer);
    let boardId = match.params.id;
    let cardId = cloneCard._id;
    let dataReq = {
      boardId,
      cardId,
      data: {
        background: "",
      },
    };
    updateCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          message.success(`Xóa ảnh bìa thành công`);
          createAction({
            boardId,
            cardId,
            data: {
              action: `xóa ảnh bìa`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error(`Xóa ảnh bìa thất bại`);
        }
      })
      .catch((err) => {
        message.error(`Xóa ảnh bìa thất bại`);
      });
  };

  useEffect(() => {
    let boardId = match.params.id;
    dispatch(getDataCardReq(boardId, card._id));
    dispatch(getLabelsBoardReq(boardId));
  }, [card]);

  return (
    <React.Fragment>
      {Object.keys(cardTaskReducer).length > 0 ? (
        <DetailCard
          stateCard={cardTaskReducer}
          visible={visible}
          handleCancel={handleCancel}
          handleCheckSuccess={handleCheckSuccess}
          handleDeleteGround={handleDeleteGround}
        >
          <Content style={{ backgroundColor: "#f5f5f5" }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col span={1} style={{ paddingLeft: "1vw" }}>
                <CreditCardOutlined style={{ color: "#757575" }} />
              </Col>
              <Col span={23}>
                <h2 style={{ marginBottom: 0, paddingLeft: "1vw" }}>
                  {cardTaskReducer.title}
                </h2>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col span={23} offset={1}>
                <div style={style.coverItemStyle}>
                  {cardTaskReducer.members.length > 0 ? (
                    <Member
                      members={cardTaskReducer.members}
                      inforMembers={detailBoardReducer.members}
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col span={23} offset={1}>
                <div style={style.coverItemStyle}>
                  {cardTaskReducer.labels.length > 0 ? (
                    <Label card={cardTaskReducer} />
                  ) : null}
                  {cardTaskReducer.deadline ? (
                    <ExpirationDate
                      card={cardTaskReducer}
                      handleCheckSuccess={handleCheckSuccess}
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <DescriptionContainer card={cardTaskReducer} />
            <FileAttachmentsContainer />
            <ActivityContainer />
            <CommentContainer />
          </Content>
          <Sider style={style.siderStyle}>
            <AddToCardContainer />
            <Manipulation card={card} />
          </Sider>
        </DetailCard>
      ) : null}
    </React.Fragment>
  );
}

export default DetailcardContainer;
