import React from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { CloseOutlined } from "@ant-design/icons";

Description.propTypes = {
  handleSave: PropTypes.func,
  handleCloseForm: PropTypes.func,
};

const style = {
  cardStyle: { backgroundColor: "#f5f5f5" },
  headCardStyle: { padding: "0 1vw", border: "none" },
  buttonSaveStyle: {
    backgroundColor: "#5aac44",
    color: "#fff",
  },
  iconCloseStyle: {
    position: "absolute",
    top: "1vh",
    padding: "0 0.7rem",
    fontSize: "1.2rem",
    border: "none",
    cursor: "pointer",
  },
};

function Description(props) {
  const { handleSave, handleCloseForm } = props;

  return (
    <React.Fragment>
      <Form.Item name="description">
        <Input.TextArea rows={5} placeholder="Thêm mô tả chi tiết hơn ..." />
      </Form.Item>
      <Form.Item>
        <Button style={style.buttonSaveStyle} onClick={handleSave}>
          Lưu
        </Button>
        <CloseOutlined onClick={handleCloseForm} style={style.iconCloseStyle} />
      </Form.Item>
    </React.Fragment>
  );
}

export default Description;
