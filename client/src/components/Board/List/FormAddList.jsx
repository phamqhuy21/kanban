import React from "react";
import { Card, Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

function FormAddList(props) {
  const { setVisible, handleAddList } = props;
  const [formAdd] = Form.useForm();

  const handleClick = () => {
    formAdd.validateFields().then((value) => {
      if (typeof value.list !== "undefined") {
        if (value.list.length > 0) {
          handleAddList(value.list);
          setVisible(false);
        }
      }
    });
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
      <Form
        form={formAdd}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleClick();
          }
        }}
      >
        <Form.Item style={{ marginBottom: "0.5vw" }} name="list">
          <Input placeholder="Nhập tiêu đề danh sách ..." />
        </Form.Item>
        <Form.Item style={{ marginBottom: "0.5vw" }}>
          <Button
            className="btn-addList"
            onClick={handleClick}
            type="primary"
            style={{
              backgroundColor: "#5aac44",
              color: "#fafafa",
              borderRadius: "0.2rem",
              border: "none",
            }}
          >
            Thêm danh sách
          </Button>
          <CloseOutlined
            style={{
              position: "absolute",
              top: "1vh",
              padding: "0 5px",
              backgroundColor: "transparent",
              fontSize: "1.2rem",
              border: "none",
              cursor: "pointer",
              color: "#9e9e9e",
            }}
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
