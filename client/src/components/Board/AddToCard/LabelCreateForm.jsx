import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Form, Input } from "antd";
import { CirclePicker } from "react-color";

LabelCreateForm.propTypes = {};

function LabelCreateForm(props) {
  const { handleCreateLabel, card } = props;
  const [stateColor, setStateColor] = useState("#f44336");
  const [formCreate] = Form.useForm();
  return (
    <Card
      size="small"
      title={<div style={{ textAlign: "center" }}>Tạo mới nhãn</div>}
      style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
      bordered={false}
      //   bodyStyle={{ padding: "0" }}
      //   headStyle={{ padding: "0" }}
    >
      <Form
        style={{ width: "17vw" }}
        form={formCreate}
        layout="vertical"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            formCreate.validateFields().then((value) => {
              handleCreateLabel(value.title, stateColor);
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
        <Form.Item style={{ marginBottom: "1vh" }}>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#4caf50",
              border: "none",
            }}
            type="primary"
            onClick={() => {
              formCreate.validateFields().then((value) => {
                handleCreateLabel(card, value.title, stateColor);
              });
            }}
          >
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LabelCreateForm;
