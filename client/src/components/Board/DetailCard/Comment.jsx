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

Comment.propTypes = {
  user: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
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
  bodyCardStyle: { padding: "3vh" },
  cardStyle: { backgroundColor: "#f5f5f5" },
  btnSaveStyle: {
    backgroundColor: "#8bc34a",
    color: "#fafafa",
    borderRadius: "0.2rem",
  },
  actionEditStyle: { textDecoration: "underline", color: "black" },
  actionDeleteStyle: { textDecoration: "underline", color: "black" },
};

function Comments(props) {
  const { user, addComment, card } = props;
  const [comment, setComment] = useState("");
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleChange = () => {
    form.validateFields().then((value) => {
      setComment(value.comment);
    });
  };

  const handleAddComment = async () => {
    const date = new Date().valueOf();
    await addComment({
      content: comment,
      time: date,
    });
    form.setFieldsValue({
      comment: "",
    });
    setComment("");
  };

  const handleDeleteComment = (comment) => {
    dispatch(deleteCommentRequest(card.id, comment));
  };

  return (
    <Card bordered={false} style={style.cardStyle}>
      <Row>
        <Col span={2}>
          <Avatar>{user[0].alias}</Avatar>
        </Col>
        <Col span={22}>
          <Card bodyStyle={style.bodyCardStyle}>
            <Form form={form}>
              <Form.Item name="comment">
                <Input
                  placeholder="Viết bình luận ..."
                  bordered={false}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "0" }}>
                <Button
                  style={style.btnSaveStyle}
                  disabled={comment === "" ? true : false}
                  onClick={handleAddComment}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row>
        {card.comment.length > 0 ? (
          <List
            dataSource={card.comment}
            renderItem={(item) => {
              return (
                <li>
                  <Comment
                    actions={[
                      <span
                        style={style.actionEditStyle}
                        onClick={() => setVisibleEdit(true)}
                      >
                        Chỉnh sửa
                      </span>,
                      <span
                        style={style.actionDeleteStyle}
                        onClick={() => handleDeleteComment(item)}
                      >
                        Xóa
                      </span>,
                    ]}
                    author={<b style={{ color: "black" }}>{user[0].name}</b>}
                    avatar={<Avatar>{user[0].alias}</Avatar>}
                    content={
                      <div>
                        {visibleEdit === true ? (
                          <FormEditComment
                            card={card}
                            comment={item}
                            setVisibleEdit={setVisibleEdit}
                          />
                        ) : (
                          <p style={{ color: "black" }}>{item.content}</p>
                        )}
                      </div>
                    }
                    datetime={
                      <span style={{ color: "black" }}>
                        {moment()
                          .subtract(
                            (new Date().valueOf() - item.time) / 60000,
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
