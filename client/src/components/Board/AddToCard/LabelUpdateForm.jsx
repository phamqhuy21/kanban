import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Form, Input } from "antd";
import { CirclePicker } from "react-color";

LabelUpdateForm.propTypes = {};

function LabelUpdateForm(props) {
  const { handleUpdateLabel, handleDeleteLabel, label } = props;
  const [stateColor, setStateColor] = useState(label.color);
  const [formUpdate] = Form.useForm();

  useEffect(() => {
    formUpdate.setFieldsValue({
      title: label.title,
    });
  }, [label]);

  return (
    <Card
      size="small"
      title={<div style={{ textAlign: "center" }}>Chỉnh sửa nhãn</div>}
      bordered={false}
    >
      <Form
        style={{ width: "17vw" }}
        form={formUpdate}
        layout="vertical"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            formUpdate.validateFields().then((value) => {
              handleUpdateLabel(label, value.title, stateColor);
            });
          }
        }}
      >
        <Form.Item
          name="title"
          style={{ marginBottom: "1vh" }}
          colon={false}
          label={
            <p
              style={{
                marginBottom: "0",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: "#757575",
              }}
            >
              Tiêu đề
            </p>
          }
        >
          <Input
            placeholder="Tiêu đề nhãn ..."
            style={{ border: "2px solid rgba(100,100,100,0.2)" }}
          />
        </Form.Item>

        <Form.Item
          colon={false}
          label={
            <p
              style={{
                marginBottom: "0",
                fontWeight: "bold",
                fontSize: "0.8rem",
                color: "#757575",
              }}
            >
              Chọn một màu
            </p>
          }
        >
          <CirclePicker
            color={stateColor}
            onChange={(color) => {
              setStateColor(color.hex);
            }}
          />
        </Form.Item>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            style={{
              margin: 0,
            }}
          >
            <Button
              style={{
                backgroundColor: "#4caf50",
                border: "none",
              }}
              type="primary"
              onClick={() => {
                formUpdate.validateFields().then((value) => {
                  handleUpdateLabel(label, value.title, stateColor);
                });
              }}
            >
              Lưu
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              margin: 0,
            }}
          >
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDeleteLabel(label);
              }}
            >
              Xóa
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}

export default LabelUpdateForm;
