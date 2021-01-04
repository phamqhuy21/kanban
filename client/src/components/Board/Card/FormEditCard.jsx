import React, { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";

function FormEditCard(props) {
  const [formEdit] = Form.useForm();
  const { card, handleSave, setVisible, visible } = props;
  const [stateTitle, setStateTitle] = useState("");

  const handleClick = () => {
    formEdit.validateFields().then((value) => {
      console.log(value);
      handleSave(card._id, value.title);
    });
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      formEdit.setFieldsValue({
        title: card.title,
      });
      setStateTitle(card.title);
    }
  }, [card, visible]);
  return (
    <Form
      form={formEdit}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          if (stateTitle.length > 0) handleClick();
        }
      }}
    >
      <Form.Item style={{ marginBottom: "0.7rem" }} name="title">
        <Input
          bordered={false}
          onChange={(e) => {
            setStateTitle(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          style={{
            backgroundColor: "#5aac44",
            color: "#fafafa",
            borderRadius: "0.2rem",
          }}
          onClick={handleClick}
          disabled={stateTitle.length > 0 ? false : true}
        >
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormEditCard;
