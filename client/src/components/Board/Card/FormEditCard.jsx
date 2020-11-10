import React, { useEffect } from "react";
import { Input, Button, Form } from "antd";

function FormEditCard(props) {
  const [formEdit] = Form.useForm();
  const { card, index, handleSave, setVisible } = props;

  const handleClick = () => {
    formEdit.validateFields().then((value) => {
      handleSave(index, value.task);
    });
    setVisible(false);
  };

  useEffect(() => {
    formEdit.setFieldsValue({
      task: card.content,
    });
  });
  return (
    <Form form={formEdit} name="basic">
      <Form.Item style={{ marginBottom: "0.7rem" }} name="task">
        <Input bordered={false} />
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
      </Form.Item>
    </Form>
  );
}

export default FormEditCard;
