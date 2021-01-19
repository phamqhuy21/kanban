import React from "react";
import { Input, Button, Card, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function FormAddCard({ setOpenForm, list, handleAddCard }) {
  const [form] = Form.useForm();

  const onAddCard = () => {
    form.validateFields().then((value) => {
      if (typeof value.task !== "undefined") {
        if (value.task.length > 0) handleAddCard(value.task);
      }
    });
  };
  return (
    <Form
      form={form}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          onAddCard();
        }
      }}
    >
      <Form.Item style={{ marginBottom: "0.3rem" }} name="task">
        <Card
          headStyle={{
            padding: "0 0.2rem",
            borderRadius: "0.2rem",
          }}
          bodyStyle={{ padding: "0" }}
          size="small"
          title={
            <Input
              style={{ border: "none" }}
              placeholder="Nhập tiêu đề cho thẻ này"
              bordered={false}
            />
          }
        ></Card>
      </Form.Item>
      <Form.Item style={{ marginBottom: "0.3rem" }}>
        <Button
          className="btn-addCard"
          style={{
            backgroundColor: "#5aac44",
            color: "#fafafa",
            borderRadius: "0.2rem",
            border: "none",
          }}
          type="primary"
          onClick={onAddCard}
        >
          Thêm thẻ
        </Button>

        <CloseOutlined
          onClick={() => setOpenForm(false)}
          style={{
            position: "absolute",
            top: "1vh",
            padding: "0 0.7rem",
            backgroundColor: "transparent",
            fontSize: "1.2rem",
            border: "none",
            cursor: "pointer",
            color: "#9e9e9e",
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default FormAddCard;
