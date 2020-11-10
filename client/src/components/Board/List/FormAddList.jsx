import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function FormAddList(props) {
  const { setVisible, handleAddList } = props;
  const [formAdd] = Form.useForm();

  const handleClick = () => {
    formAdd.validateFields().then((value) => {
      handleAddList(value.list);
    });

    setVisible(false);
  };
  return (
    <Card
      style={{
        backgroundColor: "#f5f5f5",
        borderRadius: "0.2rem",
        marginRight: "1vh",
      }}
      bodyStyle={{
        padding: "0.2rem",
      }}
    >
      <Form form={formAdd}>
        <Form.Item style={{ marginBottom: "0.5vw" }} name="list">
          <Input placeholder="Nhập tiêu đề danh sách ..." />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0.5vw" }}>
          <Button className="btn-addList" onClick={handleClick}>
            Thêm danh sách
          </Button>
          <CloseOutlined
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={() => {
              setVisible(false);
            }}
          />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default FormAddList;
