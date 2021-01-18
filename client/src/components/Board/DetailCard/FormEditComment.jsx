import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function FormEditComment(props) {
  const { setVisibleEdit, comment, handleUpdateComment, card } = props;
  const [formEdit] = Form.useForm();

  const handleClick = () => {
    // const date = new Date().valueOf();
    formEdit.validateFields().then((value) => {
      handleUpdateComment(value.comment, comment, card);
    });
    setVisibleEdit(false);
  };

  useEffect(() => {
    formEdit.setFieldsValue({
      comment: comment.content,
    });
  }, [comment.content]);

  return (
    <Form
      form={formEdit}
      name="basic"
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handleClick();
        }
      }}
    >
      <Form.Item style={{ marginBottom: "0.7rem" }} name="comment">
        <Input.TextArea placeholder="Chỉnh sửa bình luận" rows={2} />
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
