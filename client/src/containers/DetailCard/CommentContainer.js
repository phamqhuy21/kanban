import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../components/Board/DetailCard/Comments";
import { useRouteMatch } from "react-router-dom";
import { createComment, deleteComment, updateComment } from "../../api/comment";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { Button, Card, Col, message, Row } from "antd";
import { createAction } from "../../api/action";
import { CommentOutlined } from "@ant-design/icons";

CommentContainer.propTypes = {};

const style = {
  bodyCardStyle: { padding: "5px", boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)" },
  headCardStyle: { padding: "0 1vw", border: "none" },
  cardStyle: { backgroundColor: "#f5f5f5" },
};

function CommentContainer(props) {
  const [showComment, setShowComment] = useState(false);
  const usersReducer = useSelector((state) => state.usersReducer);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleAddComment = (comment, card) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let dataReq = {
      boardId,
      cardId,
      data: { comment },
    };
    createComment(dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: "bình luận",
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error("Lỗi không bình luận được");
        }
      })
      .catch((err) => {
        message.error("Lỗi không bình luận được");
      });
  };

  const handleUpdateComment = (content, comment, card) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let commentId = comment._id;
    let dataReq = {
      boardId,
      data: {
        content,
      },
    };
    updateComment(commentId, dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: "chính sửa bình luận",
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error("Lỗi không chỉnh sửa được bình luận");
        }
      })
      .catch((err) => {
        message.error("Lỗi không chỉnh sửa được bình luận");
      });
  };

  const handleDeleteComment = (comment) => {
    let boardId = match.params.id;
    let cardId = cardTaskReducer._id;
    let commentId = comment._id;
    let dataReq = {
      boardId,
      cardId,
    };
    deleteComment(commentId, dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: "xóa bình luận",
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error("Lỗi không xóa được bình luận");
        }
      })
      .catch((err) => {
        message.error("Lỗi không xóa được bình luận");
      });
  };

  return (
    <Card
      bordered={false}
      style={style.cardStyle}
      title={
        <Row>
          <Col span={1}>
            <CommentOutlined style={{ color: "#757575" }} />
          </Col>
          <Col span={15}>
            <span style={{ color: "#757575" }}>Bình luận</span>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                border: "none",
                marginLeft: "5px",
              }}
              onClick={() => {
                setShowComment(!showComment);
              }}
            >
              {!showComment ? "Hiện chi tiết" : "Ẩn"}
            </Button>
          </Col>
        </Row>
      }
      headStyle={style.headCardStyle}
      bodyStyle={{ paddingTop: "0" }}
    >
      <Comments
        user={usersReducer}
        handleAddComment={handleAddComment}
        card={cardTaskReducer}
        handleUpdateComment={handleUpdateComment}
        handleDeleteComment={handleDeleteComment}
        showComment={showComment}
      />
    </Card>
  );
}

export default CommentContainer;
