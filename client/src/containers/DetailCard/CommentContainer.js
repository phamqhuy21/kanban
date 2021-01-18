import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../components/Board/DetailCard/Comments";
import { useRouteMatch } from "react-router-dom";
import { createComment, deleteComment, updateComment } from "../../api/comment";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { message } from "antd";
import { createAction } from "../../api/action";

CommentContainer.propTypes = {};

function CommentContainer(props) {
  const { card } = props;
  const usersReducer = useSelector((state) => state.usersReducer);
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
    let cardId = card._id;
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
    <Comments
      user={usersReducer}
      handleAddComment={handleAddComment}
      card={card}
      handleUpdateComment={handleUpdateComment}
      handleDeleteComment={handleDeleteComment}
    />
  );
}

export default CommentContainer;
