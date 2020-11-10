import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { editCommentRequest } from "../../../redux/actions/board";

function FormEditComment(props) {
  const { setVisibleEdit, comment, card } = props;
  const [formEdit] = Form.useForm();
  const dispatch = useDispatch();

  const handleClick = () => {
    const date = new Date().valueOf();
    formEdit.validateFields().then((value) => {
      dispatch(
        editCommentRequest(card.id, comment.time, {
          content: value.comment,
          time: date,
        })
      );
    });
    setVisibleEdit(false);
  };

  useEffect(() => {
    formEdit.setFieldsValue({
      comment: comment.content,
    });
  });

  return (
    <Form form={formEdit} name="basic">
      <Form.Item style={{ marginBottom: "0.7rem" }} name="comment">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          style={{
            backgroundColor: "#5aac44",
            color: "#fafafa",
            borderRadius: "0.2rem",
          }}
          onClick={handleClick}
        >
          Lưu
        </Button>
        <CloseOutlined
          onClick={() => setVisibleEdit(false)}
          style={{
            position: "absolute",
            top: "1.5vh",
            left: "5vw",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default FormEditComment;
