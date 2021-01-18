import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Row,
  Col,
  Avatar,
  Form,
  Input,
  Button,
  Comment,
  List,
} from "antd";
import moment from "moment";
import FormEditComment from "./FormEditComment";
import { deleteCommentRequest } from "../../../redux/actions/board";
import { useDispatch } from "react-redux";
import { CommentOutlined } from "@ant-design/icons";

Comments.propTypes = {
  user: PropTypes.object,
  addComment: PropTypes.func,
  card: PropTypes.shape({
    id: PropTypes.string,
    comment: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        time: PropTypes.number,
      })
    ),
  }),
};

const style = {
  bodyCardStyle: { padding: "5px", boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)" },
  headCardStyle: { padding: "0 1vw", border: "none" },
  cardStyle: { backgroundColor: "#f5f5f5" },
  btnSaveStyle: {
    backgroundColor: "#4caf50",
    color: "#fafafa",
    borderRadius: "0.2rem",
    border: "none",
  },
  actionEditStyle: { textDecoration: "underline", color: "black" },
  actionDeleteStyle: { textDecoration: "underline", color: "black" },
};

function Comments(props) {
  const {
    user,
    handleAddComment,
    card,
    handleUpdateComment,
    handleDeleteComment,
  } = props;
  const [comment, setComment] = useState("");
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [commentSelected, setCommentSelected] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleChange = () => {
    form.validateFields().then((value) => {
      setComment(value.comment);
    });
  };

  const onAddComment = async () => {
    await handleAddComment(comment, card);
    form.resetFields();
    setComment("");
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
          <Col span={23}>
            <span style={{ color: "#757575" }}>Bình luận</span>
          </Col>
        </Row>
      }
      headStyle={style.headCardStyle}
      bodyStyle={{ paddingTop: "0" }}
    >
      <Row>
        <Col span={1}>
          <Avatar>{user.alias}</Avatar>
        </Col>
        <Col span={22} style={{ marginLeft: "20px" }}>
          <Card bodyStyle={style.bodyCardStyle}>
            <Form
              form={form}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onAddComment();
                }
              }}
            >
              <Form.Item name="comment" style={{ marginBottom: 0 }}>
                <Input.TextArea
                  placeholder="Viết bình luận ..."
                  bordered={false}
                  rows={3}
                  onChange={handleChange}
                  style={{ padding: "5px" }}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "0" }}>
                <Button
                  style={style.btnSaveStyle}
                  disabled={comment === "" ? true : false}
                  onClick={onAddComment}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row>
        {card.comments.length > 0 ? (
          <List
            dataSource={card.comments.sort((prev, next) => {
              return (
                new Date(next.updatedAt).valueOf() -
                new Date(prev.updatedAt).valueOf()
              );
            })}
            renderItem={(comment, index) => {
              return (
                <li key={index}>
                  <Comment
                    actions={
                      visibleEdit && comment._id === commentSelected._id
                        ? []
                        : [
                            <span
                              style={style.actionEditStyle}
                              onClick={() => {
                                setVisibleEdit(true);
                                setCommentSelected(comment);
                              }}
                            >
                              Chỉnh sửa
                            </span>,
                            <span
                              style={style.actionDeleteStyle}
                              onClick={() => handleDeleteComment(comment)}
                            >
                              Xóa
                            </span>,
                          ]
                    }
                    author={
                      <b style={{ color: "black", fontSize: "1.2em" }}>
                        {user.fullname}
                      </b>
                    }
                    avatar={
                      <Avatar style={{ marginRight: "10px" }}>
                        {user.alias}
                      </Avatar>
                    }
                    content={
                      <div>
                        {visibleEdit === true &&
                        comment._id === commentSelected._id ? (
                          <FormEditComment
                            card={card}
                            comment={commentSelected}
                            setVisibleEdit={setVisibleEdit}
                            handleUpdateComment={handleUpdateComment}
                          />
                        ) : (
                          <p style={{ color: "black" }}>{comment.content}</p>
                        )}
                      </div>
                    }
                    datetime={
                      <span style={{ color: "#9e9e9e" }}>
                        {moment()
                          .subtract(
                            (new Date().valueOf() -
                              new Date(comment.updatedAt).valueOf()) /
                              60000,
                            "minutes"
                          )
                          .fromNow()}
                      </span>
                    }
                  />
                </li>
              );
            }}
          />
        ) : null}
      </Row>
    </Card>
  );
}

export default Comments;
